[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Waller&uri=https%3A%2F%2Fraw.githubusercontent.com%2FMarceloHBoff%2Fwaller2.0%2Fmaster%2Finsomnia.json)

<div align="center">
  <img src="./.github/assets/logo.png">
</div>

---

<p align="center">
  <img alt="GitHub top languages" src="https://img.shields.io/github/languages/top/MarceloHBoff/waller.svg">

  <img alt="GitHub count languages" src="https://img.shields.io/github/languages/count/MarceloHBoff/waller.svg">

  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/MarceloHBoff/waller.svg">

  <img alt="GitHub license" src="https://img.shields.io/github/license/MarceloHBoff/waller.svg">
</p>

<h2>📔 Description</h2>

## This is waller. An App for automatic investment control. The actives are searched by CEI, using only your CPF and CEI password, there is a web crawler to get this data. In addition, automatic dividends are controlled by another web crawler, making it very easy

`Application`

<details>
  <summary>See</summary>

![Frontend](.github/assets/mobile.gif)

</details>

<h2>🚀 Technologies</h2>

- [Typescript](https://www.typescriptlang.org/)
- [NodeJS](https://nodejs.org)
- [Express](https://expressjs.com/pt-br/)
- [Postgres](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)
- [Typeorm](https://typeorm.io/#/)
- [ReactNative](https://reactnative.dev/)
- [Styled Components](https://styled-components.com/)
- [Axios](https://github.com/axios/axios)
- [React Navigation](https://reactnavigation.org/)
- [Puppeteer](https://pptr.dev/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)

---

<h2>❓ How to use</h2>

You need a postgres intence running on 5432 port and redis instanve in 6379

`Backend`

```bash
# Clone this repository
$ git clone https://github.com/MarceloHBoff/waller/tree/master/backend

# Go into the repository
$ cd waller/backend

# Install dependencies for the backend
$ yarn

# Run the backend server
$ yarn dev
```

`Mobile`

```bash
# Clone this repository
$ git clone https://github.com/MarceloHBoff/waller/tree/master/waller

# Go into the repository
$ cd waller/waller

# Install dependencies for the frontend
$ yarn

# Run the frontend
$ yarn android
```

Made with love by [Marcelo Boff!](https://www.linkedin.com/in/marcelo-boff)
