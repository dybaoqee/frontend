# Real Estate Web Client

## Install

`yarn install`

## Run

1. Make sure you have our [backend](https://github.com/em-casa/backend) up and running.
1. Then, go to your AccountKit settings and get both your App Id and App Secret.
1. Run `FACEBOOK_APP_ID=yourAppId ACCOUNT_KIT_APP_SECRET=yourAppSecret yarn start`

## Tests

`yarn test` to run automated unit, integration and end to end tests with Jest and Cypress.

If you want to open Cypress UI to run end to end tests manually, watch the process and use debugging tools run `yarn cy:open`.

## Bundle Analyzer

`yarn analyze` to build the app and run the bundle analyzer tool.
Output file with bundle sizes will be created at .next/stats.txt

## Contribute

Feel free to open issues and PRs.
