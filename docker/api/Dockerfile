FROM node:16.13.1-alpine AS development

WORKDIR /usr/src/app

COPY ./api/package*.json ./
#package*.json ./
RUN #apk add --update python3 make g++ && rm -rf /var/cache/apk/*

RUN apk add --no-cache make gcc g++ python3 && \
  npm rebuild bcrypt --build-from-source && \
  apk del make gcc g++ python3

RUN npm install -g glob rimraf ts-node @nestjs/cli && \
    npm install

COPY ./api .

EXPOSE 3000

CMD [ "yarn", "start:debug" ]
#RUN npm run build