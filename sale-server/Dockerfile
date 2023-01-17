FROM node:alpine

WORKDIR /app/sale-server

COPY package.json .

COPY yarn.lock .

RUN yarn

COPY . .

CMD ["yarn","start"]