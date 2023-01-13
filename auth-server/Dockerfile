FROM node:alpine

WORKDIR /app/auth-server

COPY ./package.json /app/auth-server

COPY ./yarn.lock /app/auth-server

RUN yarn

COPY . .

CMD ["yarn","start"]