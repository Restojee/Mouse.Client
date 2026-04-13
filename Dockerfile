FROM node:18-alpine

WORKDIR /app

COPY . .

RUN yarn cache clean && yarn install && yarn build

CMD ["yarn", "start"]