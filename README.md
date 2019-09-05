# rivine-chain-explorer
A template Rivine Chain Explorer

## Development

### Installing Dependencies

```npm install```

### Prerequisites

Export following environment variables in a `.env` file in the root of this project.

| Variable  | Example Value | Meaning |
| ------------- | ------------- | ------------- |
| VUE_APP_API_URL  | https://explorer.testnet.nbh-digital.com  | API Url (daemon backend)  |
| VUE_APP_NAME  | Goldchain  | Blockchain Name  |
| VUE_APP_PRECISION  | 9  | Precision after decimal point for the currency |
| VUE_APP_UNIT  | GFT  | Unit that will be displayed  |

### Serving Frontend

```npm run serve```