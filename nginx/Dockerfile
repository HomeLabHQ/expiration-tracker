FROM node:18-slim AS build
WORKDIR /frontend
COPY ./frontend/package.json ./
COPY ./frontend/yarn.lock ./
RUN yarn install
ARG API_URL
ENV API_URL=$API_URL
ARG PUBLIC_URL
ENV PUBLIC_URL=$PUBLIC_URL

COPY ./frontend/vite.config.ts ./
COPY ./frontend/. ./
RUN npm run build &&\
    yarn cache clean

FROM nginx:latest

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /frontend/build /usr/share/nginx/html
