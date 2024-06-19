import { Hex, createPublicClient, createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains';
import 'dotenv/config';

const { PRIVATE_KEY } = process.env;

if (!PRIVATE_KEY) {
  throw new Error('Missing environment variables.');
  }
  
export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
  });
  
export const walletClient = createWalletClient({
  chain: mainnet,
  transport: http(),
  account: privateKeyToAccount(PRIVATE_KEY as Hex),
  });
      
export const account = privateKeyToAccount(process.env.PRIVATE_KEY as Hex)
