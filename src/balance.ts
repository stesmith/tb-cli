import { formatEther } from 'viem';
import { publicClient, account } from './client';

export const getBalance = async () => {
  const { PRIVATE_KEY } = process.env;
  if (!PRIVATE_KEY) {
    console.error('Missing environment variables.');
    return;
  }

  try {
    const balance = await publicClient.getBalance({ address: account.address });
    console.log(`Balance: ${formatEther(balance)} ETH`);
  } catch (error) {
    console.error('Error fetching balance:', error);
  }
};
