export function formatAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function getNetworkName(id: string) {
  const networks: Record<string, string> = {
    "1": "Ethereum Mainnet",
    "5": "Goerli Testnet",
    "11155111": "Sepolia Testnet",
    "137": "Polygon Mainnet",
    "80001": "Mumbai Testnet",
    "42161": "Arbitrum One",
    "10": "Optimism",
    "56": "BNB Smart Chain",
    "43114": "Avalanche C-Chain",
  };
  return networks[id] || `Chain ID: ${id}`;
}
