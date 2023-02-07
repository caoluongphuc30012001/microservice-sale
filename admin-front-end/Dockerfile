FROM node:alpine

WORKDIR /app/admin-front-end

COPY package.json .

COPY yarn.lock .

RUN yarn

COPY . .


CMD ["yarn","dev"]
