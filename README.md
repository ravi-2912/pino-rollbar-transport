# Pino-Rollbar Transport

A [PinoJS](https://getpino.io/) transport for sending logs to [Rollbar](https://rollbar.com/).

## Installation

```bash
npm install pino-rollbar-transport
```

### Configuration

PinoJs `transport` consists of `target` and `options` attributes. The `options` attribute accepts and on object containing `rollbarOptions` and `logErrors` attributes. These are described below.

-   `target` - a string with value `pino-rollbar-transport`
-   `options` - an object with the following
    -   `rollbarOptions` - Rollbar configuration of type [`Rollbar.Configuration`](https://docs.rollbar.com/docs/rollbarjs-configuration-reference#context-1)
    -   `logErrors` - boolean, if `true` Rollbar errors are sent to `console.error`

#### Example Configuration

```js
import pino from "pino";

const logger = pino({
    transport: {
        target: "pino-rollbar-transport",
        options: {
            rollbarOptions: {
                accessToken: "ACCESS_TOKEN",
                captureUncaught: true,
                captureUnhandledRejections: true,
                payload: {
                    environment: "dev",
                },
            },
            logErrors: false,
        },
    },
});
```

---

## Development

Clone this repo, make changes and create a PR.

## Inspired by

1. [https://www.npmjs.com/package/@t-botz/pino-rollbar-transport](https://www.npmjs.com/package/@t-botz/pino-rollbar-transport)
2. [https://www.npmjs.com/package/@logtail/pino](https://www.npmjs.com/package/@logtail/pino)
