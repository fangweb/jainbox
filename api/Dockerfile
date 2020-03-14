FROM node:10.16-alpine AS base

FROM base AS dependencies

WORKDIR /usr/api

COPY ./proto ./api/package.json ./api/yarn.lock ./

RUN yarn install --frozen-lockfile

FROM dependencies AS release

WORKDIR /usr/api

RUN mkdir -p /usr/api/src 

COPY ./postgres/init.sql ./api/jest.config.json ./api/nodemon.json ./api/tsconfig.json ./api/tslint.json ./

ENTRYPOINT ["npm", "run"]

CMD ["dev"]

EXPOSE 3001
