FROM node:alpine

WORKDIR /app/send-mail-server

COPY package.json .

COPY yarn.lock .

RUN yarn

COPY . .

CMD ["yarn","start"]