# Real Estate Web Client

## Install

`yarn install`

## Run

1. Make sure you have our [backend][0] up and running.
1. Then, go to your AccountKit settings and get both your App Id and App Secret.
1. Run `FACEBOOK_APP_ID=yourAppId ACCOUNT_KIT_APP_SECRET=yourAppSecret yarn start`

### With docker

Before anything else, you must ave [`docker`][1]  and [`docker-compose`][2] installed in your system.

1. Ensure [backend][0] services are [up and running][3].
1. Copy [`.local.env.example`][4] as `.local.env` and substitute all keys with proper values.
1. Start all services with `docker-compose up -d`.
1. Start `next.js` with `docker-compose exec frontend yarn start`.

To use `https` locally, check the instructions in the [README from backend][5].

## Tests

`yarn test` to run automated unit, integration and end to end tests with Jest and Cypress.

If you want to open Cypress UI to run end to end tests manually, watch the process and use debugging tools run `yarn cy:open`.

## Bundle Analyzer

`yarn analyze` to build the app and run the bundle analyzer tool.

Output file with bundle sizes will be created at .next/stats.txt

## Contribute

Feel free to open issues and PRs.

At the moment, we're tracking tasks at https://www.pivotaltracker.com/n/projects/2125081

[0]: https://github.com/emcasa/backend
[1]: https://docs.docker.com/install/
[2]: https://docs.docker.com/compose/install/
[3]: https://github.com/emcasa/backend#using-docker
[4]: https://github.com/emcasa/frontend/blob/33bc74222d283892710e43fae58c2841588bf109/.local.env.example
[5]: https://github.com/emcasa/backend#enable-https-locally
