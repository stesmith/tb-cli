import 'dotenv/config'
import { Command } from 'commander';
import { getBalance } from './balance';
import { buyToken } from './buy';
import { isAddress } from 'viem';

const program = new Command();

program
  .name('blockchain-cli')
  .description('CLI app to interact with EVM blockchains and buy ERC20 tokens')
  .version('1.0.0');

program
  .command('balance')
  .description('Check the ETH balance of the account')
  .action(async () => {
    await getBalance();
  });

program
  .command('buy')
  .description('Buy ERC20 tokens using ETH')
  .requiredOption('-a, --amount <amount>', 'Amount of ETH to spend')
  .requiredOption('-t, --token <address>', 'ERC20 token contract address')
  .action(async (options) => {
    const { amount, token } = options;

    if (!isAddress(token)) {
      console.error(`Invalid token address: ${token}`);
      process.exit(1);
    }

    await buyToken(amount, token);
  });

program.parse(process.argv);
