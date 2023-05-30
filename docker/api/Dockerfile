FROM node:20-alpine AS development

WORKDIR /usr/src/app

COPY ./api/package*.json ./
#package*.json ./
RUN #apk add --update python3 make g++ && rm -rf /var/cache/apk/*

RUN apk add --no-cache make gcc g++ python3 && \
  npm rebuild bcrypt --build-from-source && \
  apk del make gcc g++ python3

RUN npm install -g glob rimraf ts-node @nestjs/cli && \
    npm install --only=development

COPY ./api .

RUN npm run build

FROM node:20-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY ./api/package*.json ./

RUN npm install -g glob rimraf ts-node @nestjs/cli && \
    npm install --only=production

COPY ./api .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/src/main"]
#RUN npm run build