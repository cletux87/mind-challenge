FROM node:18

WORKDIR /app

COPY package.json /app
COPY . .

RUN yarn install
