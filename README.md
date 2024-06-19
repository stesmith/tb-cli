# TB-CLI

## Overview

The Blockchain CLI is a command-line application that allows users to interact with the Ethereum blockchain. It enables users to check their ETH balance and buy ERC20 tokens using ETH through a decentralized exchange (DEX).

## Features

- **Check Balance**: Retrieve the current ETH balance of the account.
- **Buy Tokens**: Purchase ERC20 tokens using ETH on the Ethereum blockchain.

## Prerequisites

- Node.js and npm installed on your machine.
- A valid Ethereum private key.
- The address of the decentralized exchange and ERC20 token contract.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/blockchain-cli.git
    cd tb-cli
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory with the following content:
    ```sh
    PRIVATE_KEY=your_private_key_here
    BLAST_RPC_URL=https://rpc.blastapi.io
    ```

## Usage

1. **Check Balance**:
    ```sh
    npx ts-node src/index.ts balance
    ```

2. **Buy Tokens**:
    ```sh
    npx ts-node src/index.ts buy -a <amount_in_eth> -t <token_contract_address>
    ```

## Example

To check the ETH balance:
```sh
npx ts-node src/index.ts balance
```

To buy 0.1 ETH worth of tokens from a specific ERC20 contract:
```sh
npx ts-node src/index.ts buy -a 0.1 -t 0xYourTokenContractAddress
```

## Notes

- Ensure the token address is a valid Ethereum address (40 hex characters long).
- Make sure your private key has enough ETH to cover the transaction cost and the token purchase.

## License

This project is licensed under the MIT License.
