import { Hex, parseEther, encodeFunctionData } from 'viem';
import { publicClient, walletClient, account } from './client';

const THRUSTER_DEX_ADDRESS = '0x4300000000000000000000000000000000000003'; // Example address
const THRUSTER_DEX_ABI = [
  {
    inputs: [
      { internalType: 'uint256', name: 'amountOutMin', type: 'uint256' },
      { internalType: 'address[]', name: 'path', type: 'address[]' },
      { internalType: 'address', name: 'to', type: 'address' },
      { internalType: 'uint256', name: 'deadline', type: 'uint256' },
    ],
    name: 'swapExactETHForTokens',
    outputs: [{ internalType: 'uint256[]', name: 'amounts', type: 'uint256[]' }],
    stateMutability: 'payable',
    type: 'function',
  },
] as const;

export const buyToken = async (ethAmount: string, tokenAddress: string) => {
  try {
    console.log(`Initiating token purchase with ${ethAmount} ETH...`);

    const ethAmountInWei = parseEther(ethAmount);

    const data = encodeFunctionData({
      abi: THRUSTER_DEX_ABI,
      functionName: 'swapExactETHForTokens',
      args: [
        BigInt(0), // Minimum amount of tokens to receive (bigint)
        [tokenAddress as Hex], // Path
        account.address, // Recipient
        BigInt(Math.floor(Date.now() / 1000) + 60 * 20), // Deadline (bigint)
      ],
    });

   // Estimate gas limit
    const gasLimit = await publicClient.estimateGas({
      to: THRUSTER_DEX_ADDRESS as `0x${string}`,
      data,
      value: ethAmountInWei,
    });

    // Get current gas price
    const gasPrice = await publicClient.getGasPrice();

    // Construct the transaction request manually
    const txRequest = {
      to: THRUSTER_DEX_ADDRESS as `0x${string}`,
      value: ethAmountInWei,
      data,
      gasLimit,
      gasPrice,
    };

    // Send the transaction
    const tx = await walletClient.sendTransaction(txRequest);

    console.log('Purchase successful!');
    console.log(`Transaction Hash: ${tx}`);
    console.log(`Purchased ${ethAmount} ETH worth of tokens from address: ${tokenAddress}`);
  } catch (error) {
    console.error('Error during purchase:', error);
  }
};
