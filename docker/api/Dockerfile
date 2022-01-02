FROM node:16.13.1-alpine AS development

WORKDIR /usr/src/app

COPY ./api/package*.json ./
#package*.json ./

RUN npm install glob rimraf ts-node

#RUN npm install --only=development

COPY ./api .

#RUN npm run build