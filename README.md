**docker-compose up -d**

**docker-compose rm -vf** (will remove only anonymous volumes.)

**docker-compose exec api yarn install**

**docker-compose exec api yarn build**

**docker-compose down --remove-orphans**

**Generate ssl for local dev**

`openssl req -x509 -out certificate.crt -keyout private.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")`

aws ecs --profile personal2 describe-task-definition \
--task-definition My-new-task-definition:13 \
--query taskDefinition > task-definition.json

# put all .env in the real environment
export $(cat .env) > /dev/null 2>&1;

docker stack deploy --with-registry-auth -c docker-compose.yml myapp
docker service ps myapp_api

aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 861579771046.dkr.ecr.eu-central-1.amazonaws.com
