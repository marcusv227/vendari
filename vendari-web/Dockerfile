##################
# BASE IMAGE
##################

FROM node:20-alpine AS base

RUN npm config set prefix /home/node/.npm-global

###################
# DEVELOPMENT IMAGE
###################

FROM base AS development

USER root

RUN apk --no-cache add \
  bash \
  curl \
  git \
  ca-certificates \
  procps \
  coreutils

USER node

WORKDIR /home/node/app

COPY --chown=node:node . .

EXPOSE 4400

CMD ["tail", "-f", "/dev/null"]
