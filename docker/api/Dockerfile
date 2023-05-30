FROM node:20-alpine AS development

WORKDIR /usr/src/app

COPY ./api/package*.json ./
#package*.json ./
RUN #apk add --update python3 make g++ && rm -rf /var/cache/apk/*

RUN apk add --no-cache make gcc g++ python3 && \
  yarn add bcrypt --force --build-from-source && \
  apk del make gcc g++ python3

RUN yarn global add glob rimraf ts-node @nestjs/cli && \
    yarn install --only=development

COPY ./api .

RUN yarn run build

FROM node:20-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY ./api/package*.json ./

RUN yarn global add glob rimraf ts-node @nestjs/cli && \
    yarn install --only=production

COPY ./api .

RUN yarn run build

EXPOSE 3000

CMD ["node", "dist/src/main"]