#!/bin/sh

KEEPER_SCHEME=${KEEPER_SCHEME:-http}
KEEPER_HOST=${KEEPER_HOST:-localhost}
KEEPER_PORT=${KEEPER_PORT:-8545}
AQUARIUS_SCHEME=${AQUARIUS_SCHEME:-http}
AQUARIUS_HOST=${AQUARIUS_HOST:-localhost}
AQUARIUS_PORT=${AQUARIUS_PORT:-5000}

envsubst < /pleuston/config/ocean.js.template > /pleuston/config/ocean.js
if [ "${LOCAL_CONTRACTS}" = "true" ]; then
  echo "Waiting for contracts to be generated..."
  while [ ! -f "/pleuston/node_modules/@oceanprotocol/keeper-contracts/artifacts/ready" ]; do
    sleep 2
  done
fi
echo "Starting Pleuston..."
npm run build
serve -l tcp://"${LISTEN_ADDRESS}":"${LISTEN_PORT}" -s /pleuston/build/
