
# Token Price Explorer (Take-Home Assessment)
## Overview

This application allows users to explore potential token swaps by selecting a source and target cryptocurrency token, inputting a USD amount, and seeing the approximate equivalent amounts in those tokens based on current market prices.

The core functionality involves fetching token data and pricing information from the `@funkit/api-base` api and performs calculations to simulate a swap from an inputted USD value.
## Features

- Token selection (select between USDC, USDT, ETH, and WBTC as source and target tokens)
- Price conversion (view token data across multiple blockchains)


## Tech Stack

**Client:** React (TypeScript), NextJS, TailwindCSS

**API Integration:** FunKit API for blockchain data

**State Management**: React Context API with reducers

## Usage

1. Select a source token from the available options
2. Select a target token for comparison
3. Enter a USD amount in the input field
4. View detailed token information and conversion rates
5. Use the reset button to start a new comparison
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```


## Environment Setup

To run this project, you will need to add the following environment variables to your .env file

`FUNKIT_API_KEY=Z9SZaOwpmE40KX61mUKWm5hrpGh7WHVkaTvQJpQk`

## Installation

Clone the repository

```bash
 git clone https://github.com/brandenrbasche/token-compare-app
 cd token-compare-app
```

Install dependences
```bash
npm install
```

Start development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.
## Build for Production

```bash
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
