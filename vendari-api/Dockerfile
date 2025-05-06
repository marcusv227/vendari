FROM node:20-alpine AS base

USER root

RUN npm install -g @nestjs/cli@10.3.2

RUN apk --update add  \
    ca-certificates \
    curl \
    wget \
    git \
    git-flow \
    coreutils \
    procps \
    openssl \
    bash

FROM base AS development

USER node

WORKDIR /home/node/app

CMD ["tail", "-f", "/dev/null"]