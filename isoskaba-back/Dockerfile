FROM node:12.14-alpine

RUN apk add --update git
RUN apk add --update tar
RUN apk add --update gzip
RUN apk add --update ca-certificates
RUN apk add --update openssh
RUN apk add --update curl
RUN apk add --update docker-compose

WORKDIR /usr/src/app

CMD npm start

COPY package.json /usr/src/app/package.json 
COPY package-lock.json /usr/src/app/package-lock.json

RUN npm ci

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY . /usr/src/app

