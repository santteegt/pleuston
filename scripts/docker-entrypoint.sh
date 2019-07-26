#!/bin/sh

if [ "${LOCAL_CONTRACTS}" = "true" ]; then
    printf '\n\e[33m◯ Waiting for contracts to be generated...\e[0m\n'

    while [ ! -f "/pleuston/node_modules/@oceanprotocol/keeper-contracts/artifacts/ready" ]; do
        sleep 2
    done

    printf '\e[32m✔ Found new contract artifacts.\e[0m\n'
fi

# we use the development server for faster startup in Barge
printf '\n\e[33mStarting Pleuston (development)...\e[0m\n'
npm start

# use production build and serve output
# if you use Docker for live deployments
# printf '\n\e[33mStarting Pleuston (production)...\e[0m\n'
# npm run build
# serve -l tcp://"${LISTEN_ADDRESS}":"${LISTEN_PORT}" -s /pleuston/build/
