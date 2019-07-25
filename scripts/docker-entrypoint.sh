#!/bin/sh

# required only for Spree (default)
export LOCAL_CONTRACTS='true'

echo "Starting Pleuston..."

# we use the development server for faster startup in Barge
npm start
# use production build and serve output
# if you use Docker for live deployments
# npm run build
# serve -l tcp://"${LISTEN_ADDRESS}":"${LISTEN_PORT}" -s /pleuston/build/
