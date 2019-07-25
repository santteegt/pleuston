[![banner](https://raw.githubusercontent.com/oceanprotocol/art/master/github/repo-banner%402x.png)](https://oceanprotocol.com)

<h1 align="center">Pleuston</h1>

> 🦄 Web app for consumers to explore, download, and publish data assets.

[![Docker Build Status](https://img.shields.io/docker/build/oceanprotocol/pleuston.svg)](https://hub.docker.com/r/oceanprotocol/pleuston/) [![Build Status](https://api.travis-ci.com/oceanprotocol/pleuston.svg?branch=master)](https://travis-ci.com/oceanprotocol/pleuston) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/d4ebd79e33054bf98d8e55b0dde5452b)](https://app.codacy.com/app/ocean-protocol/pleuston?utm_source=github.com&utm_medium=referral&utm_content=oceanprotocol/pleuston&utm_campaign=badger) [![js oceanprotocol](https://img.shields.io/badge/js-oceanprotocol-7b1173.svg)](https://github.com/oceanprotocol/eslint-config-oceanprotocol) [![css bigchaindb](https://img.shields.io/badge/css-bigchaindb-39BA91.svg)](https://github.com/bigchaindb/stylelint-config-bigchaindb)

![banner](https://user-images.githubusercontent.com/90316/43195950-cc01fd90-9006-11e8-8d5e-cb802c6502b3.gif "Big Banner")

> _Pleuston [`ˈplustən`]: organisms that live in the thin surface layer existing at the air-water interface of a body of water as their habitat_

---

**🐲🦑 THERE BE DRAGONS AND SQUIDS. This is in alpha state and you can expect running into problems. If you run into them, please open up [a new issue](https://github.com/oceanprotocol/pleuston/issues). 🦑🐲**

**For a more lightweight implementation of Ocean Protocol components into a React app, have a look at [commons](https://github.com/oceanprotocol/commons) too.**

---

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Development](#development)
  - [MetaMask](#metamask)
- [Configuration](#configuration)
  - [Storage Providers](#storage-providers)
    - [AWS](#aws)
    - [Azure Storage](#azure-storage)
  - [SSL](#ssl)
- [Testing](#testing)
- [Code style](#code-style)
- [Production build](#production-build)
- [Releases](#releases)
- [Changelog](#changelog)
- [License](#license)

---

## Features

This repository houses _Pleuston_, a reference web app for consumers to explore, download, and publish data assets within the Ocean Protocol network. It is shipped as the main interface to interact with Ocean components when running [🐳 barge](https://github.com/oceanprotocol/barge).

- Connect to all required Ocean Protocol components: _Keeper_, _Aquarius_, _Brizo_, _Secret Store_
- Register and publish data assets
- Explore, buy, and download data assets

_Pleuston_ is a single page React app, bootstrapped with [`create-react-app`](https://github.com/facebook/create-react-app).

## Prerequisites

- Node.js >=8 <12
- npm
- Ocean Protocol components (with Docker)
- [MetaMask](https://metamask.io)

To start development with _Pleuston_ you first have to get all the other Ocean Protocol components up and running.

The simplest way is to use our main script from the [🐳 barge](https://github.com/oceanprotocol/barge) repository to spin up a local Spree test network, and pass the option to skip the _Pleuston_ image in there:

```bash
git clone git@github.com:oceanprotocol/barge.git
cd barge/

./start_ocean.sh --no-pleuston
```

This will start up all required components [as documented in _Barge_](https://github.com/oceanprotocol/barge#docker-building-blocks).

## Development

After the Docker containers from the above step are up, you can start your local development version of _Pleuston_:

```bash
git clone git@github.com:oceanprotocol/pleuston.git
cd pleuston/

npm i

# exporting this variable before running `npm start`,
# will copy generated contract artifacts from Docker container
# required for local Spree test network
export LOCAL_CONTRACTS=true

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

- the [`Nile`](https://docs.oceanprotocol.com/concepts/testnets/#the-nile-testnet) test network (RPC `https://nile.dev-ocean.com`), or
- `Localhost 8545`

The latter will connect you to the RPC client running inside Docker, which by default is a local [Spree](https://docs.oceanprotocol.com/concepts/testnets/#a-spree-testnet-for-local-development) test network.

## Configuration

All required components to get _Pleuston_ running are pre-configured and started with _Barge_, and the web app is configured to connect to them locally by default.

If you want to change and run _Pleuston_ against Nile remote components, or your own deployed components, head over to the [`src/config/ocean.js`](./src/config/ocean.js) file and modify the respective values.

- [`src/config/ocean.js`](./src/config/ocean.js)

### Storage Providers

When registering assets, files can be retrieved from various cloud storage providers.

<img width="545" alt="screen shot 2019-02-12 at 12 47 42" src="https://user-images.githubusercontent.com/90316/52633365-6c7b5300-2ec4-11e9-825c-e8bc65655812.png">

Configuration for all storage provider options can be found in:

- [`src/config/cloudStorage.js`](src/config/cloudStorage.js)

#### AWS

App includes a connection to Amazon Web Services, so you can retrieve and register assets stored in an S3 bucket. Setting AWS connection requires the setup of Cognito authentication service with proper access policies for the specific bucket.

#### Azure Storage

App includes an OAuth connection to your Azure account. Once authorized, assets can be chosen from a file list within _Pleuston_.

_Note: Currently, Azure Storage only allows listing containers with OAuth credentials. Listing blobs in containers and operations on blobs can't be done with OAuth credentials until [that feature is out of preview](https://docs.microsoft.com/en-gb/azure/storage/common/storage-auth-aad). Until then, manually added credentials are required in [`src/config/cloudStorage.js`](src/config/cloudStorage.js)_

### SSL

To run your application over SSL, set the scheme values in [`src/config/ocean.js`](./src/config/ocean.js) to `https`, e.g.:

```js
module.exports = {
    nodeUri: 'https://my-node-uri.com',
    ...
}
```

## Testing

Automatic tests are setup via Travis, executing `npm test`.

The tests run:

- linting checks with ESLint and Stylelint
- basic rendering tests for components with Jest

While code coverage status will be reported in the console and on Travis, coverage information won't be uploaded to Codacy for any Pull Request from a forked repo. That is because of a [security restriction in Travis](https://docs.travis-ci.com/user/pull-requests/#pull-requests-and-security-restrictions).

## Code style

Code linting is setup with [ESLint](https://eslint.org) and [stylelint](https://stylelint.io) following [eslint-config-oceanprotocol](https://github.com/oceanprotocol/eslint-config-oceanprotocol) and [stylelint-config-bigchaindb](https://github.com/bigchaindb/stylelint-config-bigchaindb).

There's a npm script setup which runs only linting tests:

```bash
npm run lint
```

## Production build

You can inspect a full production build by creating it first, and then run a local web server on top of the build output, e.g. [`serve`](https://github.com/zeit/serve):

```bash
# create production build
npm run build

serve -s build/
# go to http://localhost:5000
```

## Releases

From a clean `master` branch you can run any release task doing the following:

- bumps the project version in `package.json`
- auto-generates and updates the CHANGELOG.md file from commit messages
- creates a Git tag
- commits and pushes everything
- creates a GitHub release with commit messages as description

You can execute the script using {major|minor|patch} as first argument to bump the version accordingly:

- To bump a patch version: `npm run release`
- To bump a minor version: `npm run release minor`
- To bump a major version: `npm run release major`

For the GitHub releases steps a GitHub personal access token, exported as `GITHUB_TOKEN` is required. [Setup](https://github.com/release-it/release-it#github-releases)

Pleuston is not deployed anywhere remotely, but is distributed via [_Barge_](https://github.com/oceanprotocol/barge). All release tags and branches are automatically built on [Docker Hub](https://cloud.docker.com/u/oceanprotocol/repository/docker/oceanprotocol/pleuston), and _Barge_ refers to one of those Docker builds.

## Changelog

See the [CHANGELOG.md](./CHANGELOG.md) file. This file is auto-generated during the above mentioned release process.

## License

```text
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
