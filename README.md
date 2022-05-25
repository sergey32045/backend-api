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