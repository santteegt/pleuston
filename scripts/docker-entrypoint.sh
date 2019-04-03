#!/bin/sh

NODE_SCHEME=${NODE_SCHEME:-http}
NODE_HOST=${NODE_HOST:-localhost}
NODE_PORT=${NODE_PORT:-8545}
AQUARIUS_SCHEME=${AQUARIUS_SCHEME:-http}
AQUARIUS_HOST=${AQUARIUS_HOST:-localhost}
AQUARIUS_PORT=${AQUARIUS_PORT:-5000}
BRIZO_SCHEME=${BRIZO_SCHEME:-http}
BRIZO_HOST=${BRIZO_HOST:-localhost}
BRIZO_PORT=${BRIZO_PORT:-8030}
BRIZO_PASSWORD=${BRIZO_PASSWORD:-0x00bd138abd70e2f00903268f3db08f2d25677c9e}
PARITY_SCHEME=${PARITY_SCHEME:-http}
PARITY_HOST=${PARITY_HOST:-localhost}
PARITY_PORT=${PARITY_PORT:-8545}
SECRET_STORE_SCHEME=${SECRET_STORE_SCHEME:-http}
SECRET_STORE_HOST=${SECRET_STORE_HOST:-localhost}
SECRET_STORE_PORT=${SECRET_STORE_PORT:-12001}

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
