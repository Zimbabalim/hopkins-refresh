FROM node:14.15.5-alpine3.10

WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .
