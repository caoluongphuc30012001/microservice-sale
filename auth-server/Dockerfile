FROM node

WORKDIR /app/auth-server

EXPOSE 3000

COPY ./package.json /app/auth-server

RUN yarn

COPY . .

CMD ["yarn","start"]