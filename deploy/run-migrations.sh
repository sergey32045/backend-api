#!/usr/bin/env bash

# step 1: define the AWS parameters to target the latest task definition for an
# ECS service and build the parameter to override the default container command.
profile=personal2
region=eu-central-1
cluster=super-cluster-4

cmd=$(cat <<EOF
{"containerOverrides": [
    {
      "name": "interview-API",
      "command": ["yarn", "typeorm:db:migrate"]
    }
  ]
}
EOF
)

# step 2: query AWS for the latest task definition given parameters specified
# above and strip it down to the latest revision of the task definition
taskDefinition=$( \
aws ecs list-task-definitions --region $region \
                              --output text \
                              | tail -n1 | awk -F '/' '{print $NF}' \
)

# step 3: run a new ECS task that runs the override command specified above
# using the latest revision of the task definition for the targeted service
echo "running database migration using '$taskDefinition' task definition"
aws ecs run-task --region $region \
                 --cluster $cluster \
                 --task-definition $taskDefinition \
                 --overrides "$cmd"