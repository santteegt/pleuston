FROM node:11-alpine
LABEL maintainer="Ocean Protocol <devops@oceanprotocol.com>"

ENV LISTEN_ADDRESS='0.0.0.0'
ENV LISTEN_PORT='3000'

RUN apk add --no-cache --update\
    bash\
    g++\
    gcc\
    git\
    gettext\
    make\
    python\
    && rm -rf /var/cache/apk/*

COPY . /pleuston
WORKDIR /pleuston

RUN npm install -g serve
RUN npm install && npm cache clean --force

ENTRYPOINT ["/pleuston/scripts/docker-entrypoint.sh"]

# Expose listen port
EXPOSE 3000
