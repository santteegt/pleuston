[![banner](https://raw.githubusercontent.com/oceanprotocol/art/master/github/repo-banner%402x.png)](https://oceanprotocol.com)

# Pleuston

![banner](https://user-images.githubusercontent.com/90316/43195950-cc01fd90-9006-11e8-8d5e-cb802c6502b3.gif "Big Banner")

> 🦄 Web app for consumers to explore, download, and publish data assets.

[![Docker Build Status](https://img.shields.io/docker/build/oceanprotocol/pleuston.svg)](https://hub.docker.com/r/oceanprotocol/pleuston/) [![Build Status](https://api.travis-ci.com/oceanprotocol/pleuston.svg?branch=master)](https://travis-ci.com/oceanprotocol/pleuston) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/d4ebd79e33054bf98d8e55b0dde5452b)](https://app.codacy.com/app/ocean-protocol/pleuston?utm_source=github.com&utm_medium=referral&utm_content=oceanprotocol/pleuston&utm_campaign=badger) [![js oceanprotocol](https://img.shields.io/badge/js-oceanprotocol-7b1173.svg)](https://github.com/oceanprotocol/eslint-config-oceanprotocol) [![css bigchaindb](https://img.shields.io/badge/css-bigchaindb-39BA91.svg)](https://github.com/bigchaindb/stylelint-config-bigchaindb)


> _Pleuston [`ˈplustən`]: organisms that live in the thin surface layer existing at the air-water interface of a body of water as their habitat_

---

**🐲🦑 THERE BE DRAGONS AND SQUIDS. This is in alpha state and you can expect running into problems. If you run into them, please open up [a new issue](https://github.com/oceanprotocol/pleuston/issues). 🦑🐲**

Main issues right now:
- assets can only be purchased if they're hosted in Azure storage account
- orders screen is not fully working

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
    - [🐋 aquarius](#aquarius)
    - [💧 keeper-contracts](#keeper-contracts)
- [Storage Providers](#storage-providers)
    - [Azure Storage](#azure-storage)
- [Development](#development)
    - [MetaMask](#metamask)
    - [Production build](#production-build)
- [Configuration](#configuration)
- [Code style](#code-style)
- [Testing](#testing)
- [License](#license)

---

## Features

This repository houses _Pleuston_, the reference web app for consumers to explore, download, and publish data assets within the Ocean Protocol network.

- Connect to all required Ocean Protocol components: _Keeper_ & _Aquarius_
- Register and publish data assets
- Explore, buy, and download data assets

_Pleuston_ is a single page React app, initially bootstrapped with [`create-react-app`](https://github.com/facebook/create-react-app), but ejected from it.

## Prerequisites

- Node.js >=8
- npm
- Ocean Protocol components
- [MetaMask](https://metamask.io)

To start development with _Pleuston_ you first have to get all the other Ocean Protocol components up and running.

![ocean-components](https://user-images.githubusercontent.com/90316/45811608-d6a11a80-bccd-11e8-875e-f62c86b4b218.png)

The simplest way is to use our main script utilizing `docker-compose` from the [🐳 docker-images](https://github.com/oceanprotocol/docker-images) repository, and pass the option to skip the _Pleuston_ image in there:

```bash
git clone git@github.com:oceanprotocol/docker-images.git
cd docker-images/

./start_ocean.sh --no-pleuston --latest
```

This will start up all required components:

### [🐋 aquarius](https://github.com/oceanprotocol/aquarius)

You now have a locally running _Aquarius_ backend application exposed under `http://localhost:5000`.

### [💧 keeper-contracts](https://github.com/oceanprotocol/keeper-contracts)

You now have a locally running RPC client with all the contracts from _keeper-contracts_ deployed to it, exposed under `http://localhost:8545`.

## Storage Providers

As af right now, _pleuston_ requires asset files to be stored in Azure Cloud Storage before registering them through the UI. For more convenience we will integrate connections to various cloud storage providers.

<img width="584" alt="screen shot 2018-10-18 at 12 48 53" src="https://user-images.githubusercontent.com/90316/47149555-33472380-d2d4-11e8-982d-7f815c7499e9.png" />

### Azure Storage

App includes an OAuth connection to your Azure account. Once authorized, assets can be chosen from a file list within _pleuston_.

_Note: Currently, Azure Storage only allows listing containers with OAuth credentials. Listing blobs in containers and operations on blobs can't be done with OAuth credentials until [that feature is out of preview](https://docs.microsoft.com/en-gb/azure/storage/common/storage-auth-aad). Until then, manually added credentials are required in [`config/cloudStorage.js`](config/cloudStorage.js)_

## Development

After the Docker containers from the above step are up, you can start your local development version of _Pleuston_:

```bash
git clone git@github.com:oceanprotocol/pleuston.git
cd pleuston/

npm i
npm start
```

This should output a message as follows:

```bash
Compiled successfully!

You can now view @oceanprotocol/pleuston in the browser.

  Local:            http://localhost:3000/
```

### MetaMask

Be sure to login into your MetaMask account and either select:

- the `Kovan` test network, or
- `Localhost 8545`

The latter will connect you to the RPC client running inside Docker.

### Production build

You can inspect a full production build by creating it first, and then run a local web server on top of the build output, e.g. [`serve`](https://github.com/zeit/serve):

```bash
# create production build
npm run build

serve -s build/
# go to http://localhost:5000
```

## Configuration

All required components to get _Pleuston_ running are pre-configured and started with the above `docker-compose` command, and the web app is configured to connect to them.

If you want to change and run _Pleuston_ against your own deployed components, head over to the [`config/ocean.js`](./config/ocean.js) file and modify the respective values.

To run your application over SSL, set the scheme values in [`config/ocean.js`](./config/ocean.js) to `https`:

```js
module.exports = {
    keeperScheme: 'https',
    aquariusScheme: 'https'
}
```

## Code style

Code linting is setup with [ESLint](https://eslint.org) and [stylelint](https://stylelint.io) following [eslint-config-oceanprotocol](https://github.com/oceanprotocol/eslint-config-oceanprotocol) and [stylelint-config-bigchaindb](https://github.com/bigchaindb/stylelint-config-bigchaindb).

There's a npm script setup which runs all linting tests:

```bash
npm run lint
```

## Testing

Automatic tests are setup via Travis, executing `npm test:ci`. If you want to execute these tests locally, please use `npm test`. Otherwise, setup an account with [Codacy](https://www.codacy.com/) and provide an API Token as described in their [documentation](https://support.codacy.com/hc/en-us/articles/115000255385).

At the moment, besides linting tests, there's only one test checking if the whole app can be rendered.

## License

```
Copyright 2018 Ocean Protocol Foundation Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
