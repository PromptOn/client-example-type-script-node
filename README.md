# PromptOn API - Typescript node example

A barebone example for [PromptOn API](https://github.com/PromptOn/prompton) SDK in typescript / node

Please note this is work in progress. Some changes in the making to improve dev UX of the SDK.

It also means this example might not work with latest API and prompton npm package version. Just raise an issue if you have any problem.

## Installation

Prerequisites:

- PromptOn Api user account on our hosted environment

  _Drop an email for early access:_ <hello@prompton.ai>

    or

- Local PromptOn Api server - see [PromptOn API](https://github.com/PromptOn/prompton)

Repo & yarn:

```sh
gh repo clone PromptOn/client-example-type-script-node

npm install yarn
```

Install `just`

- Mac: `brew install just`
- [Just install on other platforms](<https://github.com/casey/just#packages>)

Create your local `.env`  See: [.env.example](.env.example)

Install packages:

```sh
just install
```



Run it:

```sh
just run
```
