FROM node:18-slim
RUN mkdir -p /frontend/node_modules && \
    chown -R node:node /frontend
USER node
WORKDIR /frontend
COPY ./frontend/package.json ./
COPY ./frontend/yarn.lock ./
RUN yarn install &&\
    yarn cache clean
