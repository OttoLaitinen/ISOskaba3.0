FROM node:12.14-alpine

RUN apt-get update && apt-get install -y git
RUN apt-get update && apt-get install -y ssh
RUN apt-get update && apt-get install -y tar
RUN apt-get update && apt-get install -y gzip
RUN apt-get update && apt-get install -y ca-certificates

WORKDIR /usr/src/app

CMD npm start

COPY package.json /usr/src/app/package.json
COPY package-lock.json /usr/src/app/package-lock.json

RUN npm ci

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY . /usr/src/app

