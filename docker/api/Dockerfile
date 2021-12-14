FROM node:12.19.0-alpine3.9 AS development

WORKDIR /usr/src/app

COPY ./api/package*.json ./
#package*.json ./

RUN npm install glob rimraf

#RUN npm install --only=development

COPY ./api .

#RUN npm run build