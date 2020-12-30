FROM node:12-slim

WORKDIR /app

COPY dist /app

RUN yarn global add hss-server --registry=https://registry.npm.taobao.org

CMD ["hss", "-r", "/app"]
