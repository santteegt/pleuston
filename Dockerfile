FROM node:8-alpine
LABEL maintainer="Ocean Protocol <devops@oceanprotocol.com>"

RUN apk add --no-cache --update\
    bash\
    g++\
    gcc\
    gettext\
    git\
    krb5-dev\
    krb5-libs\
    krb5\
    make\
    cairo-dev\
    python

COPY . /pleuston
WORKDIR /pleuston

RUN npm install -g npm serve
RUN npm install

# Default ENV values
# config/config.js
ENV NODE_SCHEME='http'
ENV NODE_HOST='localhost'
ENV NODE_PORT='8545'
ENV AQUARIUS_SCHEME='http'
ENV AQUARIUS_HOST='localhost'
ENV AQUARIUS_PORT='5000'
ENV BRIZO_SCHEME: 'https',
ENV BRIZO_HOST: 'localhost',
ENV BRIZO_PORT: 8030,
ENV PARITY_SCHEME: 'http',
ENV PARITY_HOST: 'localhost',
ENV PARITY_PORT: 8545,
ENV SECRET_STORE_SCHEME: 'http',
ENV SECRET_STORE_HOST: 'localhost',
ENV SECRET_STORE_PORT: 12001,
ENV SECRET_STORE_THRESHOLD: 0,
ENV SECRET_STORE_PASSWORD: 'unittest'
ENV SECRET_STORE_ADDRESS: '0xed243adfb84a6626eba46178ccb567481c6e655d'
# scripts/docker-entrypoint.sh
ENV LISTEN_ADDRESS='0.0.0.0'
ENV LISTEN_PORT='3000'

ENTRYPOINT ["/pleuston/scripts/docker-entrypoint.sh"]

# Expose listen port
EXPOSE 3000
