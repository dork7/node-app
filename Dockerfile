FROM node:12-alpine

EXPOSE 4000

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

RUN mkdir /app
WORKDIR /app
ADD package.json yarn.lock /app/
RUN yarn --pure-lockfile
ADD . /app

RUN yarn add cross-env
RUN /bin/sh -c "apk add --no-cache bash"


CMD ["yarn", "docker:start"]
