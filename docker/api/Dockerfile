FROM node:16.13.1-alpine AS development

WORKDIR /usr/src/app

COPY ./api/package*.json ./
#package*.json ./
RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*

RUN npm install -g glob rimraf ts-node @nestjs/cli

RUN npm install

COPY ./api .

#RUN npm run build