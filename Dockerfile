FROM node:16-alpine AS builder
WORKDIR "/app"
COPY ./app/ .
RUN yarn install && yarn cache clean && yarn build
CMD [ "sh", "-c", "yarn run start"]