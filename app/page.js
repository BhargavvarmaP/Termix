"use client"; // Mark the component as a Client Component

import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import WalletForm from './components/WalletForm';
import BalanceDisplay from './components/BalanceDisplay';
import Spinner from './components/Spinner'; // Assuming you have a Spinner component
import Moralis from 'moralis';

const Home = () => {
  const [balances, setBalances] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [network, setNetwork] = useState('Ethereum'); // Add state for the selected network

  // Initialize Moralis SDK
  useEffect(() => {
    const initializeMoralis = async () => {
      try {
        await Moralis.start({ apiKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImI4MDE2Mjk2LTBmYmQtNDNhZi1hYjdmLTc1ZjJlNGJhZDJlNiIsIm9yZ0lkIjoiNDA5ODk4IiwidXNlcklkIjoiNDIxMjE3IiwidHlwZUlkIjoiYmI3NDA2MjItMTg3NC00M2U3LThkNmEtZjQ1ODNlMmJjNGFlIiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE3Mjc2MzU2MTEsImV4cCI6NDg4MzM5NTYxMX0.BfY7U20znDKc4MODu8kAEgV8hmEGj2TwoGOF9prigPA" }); // Replace with your Moralis API key
      } catch (error) {
        console.error("Error initializing Moralis:", error);
      }
    };

    initializeMoralis();
  }, []);

  const fetchBalances = async (address, selectedNetwork) => {
    setLoading(true);
    setErrorMessage('');
    setNetwork(selectedNetwork); // Set the selected network

    // Validate address and network
    if (!isValidAddress(address)) {
      setErrorMessage('Invalid wallet address.');
      setLoading(false);
      return;
    }

    const networkChainIds = {
      'Ethereum': '0x1',       // Ethereum Mainnet
      'Binance': '0x38',       // Binance Smart Chain Mainnet
      'Arbitrum': '0xa4b1',    // Arbitrum One Mainnet
      'Optimism': '0xa',       // Optimism Mainnet
    };

    const chainId = networkChainIds[selectedNetwork];

    if (!chainId) {
      setErrorMessage('Invalid network selected.');
      setLoading(false);
      return;
    }

    try {
      // Fetch native balance
      const nativeBalanceResponse = await Moralis.EvmApi.balance.getNativeBalance({
        address: address,
        chain: chainId,
      });

      // Fetch ERC20 token balances
      const tokenBalancesResponse = await Moralis.EvmApi.token.getWalletTokenBalances({
        address: address,
        chain: chainId,
      });

      const filteredTokens = tokenBalancesResponse?.raw.filter(token =>
        ['USDT', 'WETH', '1INCH'].includes(token.symbol)
      );

      // Initialize token balances with zeros
      const tokens = [
        { symbol: 'USDT', balance: 0, price: null },
        { symbol: 'WETH', balance: 0, price: null },
        { symbol: '1INCH', balance: 0, price: null },
      ];

      // Update balances for available tokens
      if (filteredTokens) {
        for (const token of filteredTokens) {
          try {
            const priceResponse = await Moralis.EvmApi.token.getTokenPrice({ address: token.token_address });
            const index = tokens.findIndex(t => t.symbol === token.symbol);
            if (index !== -1) {
              tokens[index] = {
                symbol: token.symbol,
                balance: token.balance / (10 ** token.decimals),
                price: priceResponse ? priceResponse.usdPrice : 'Price not available', // Handle missing liquidity pool
              };
            }
          } catch (priceError) {
            console.warn(`Price not found for token ${token.symbol}:`, priceError);
            const index = tokens.findIndex(t => t.symbol === token.symbol);
            if (index !== -1) {
              tokens[index].price = 'Price not available'; // Handle error gracefully
            }
          }
        }
      }

      const formattedData = {
        nativeBalance: nativeBalanceResponse?.raw?.balance / 1e18, // Convert Wei to Ether
        tokens: tokens,
      };

      setBalances(formattedData);
    } catch (error) {
      setErrorMessage('Failed to fetch balances. Please try again later.');
      console.error("Error fetching balances:", error);
    } finally {
      setLoading(false);
    }
  };

  const isValidAddress = (address) => /^0x[a-fA-F0-9]{40}$/.test(address);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 p-6">
      <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6 flex items-center justify-center">
          <FontAwesomeIcon icon={faWallet} className="mr-2 text-indigo-500" />
          Wallet Balance Checker
        </h1>

        <WalletForm onSubmit={fetchBalances} loading={loading} errorMessage={errorMessage} />

        {loading && (
          <div className="flex justify-center mt-6">
            <Spinner />
          </div>
        )}

        {errorMessage && (
          <p className="mt-4 text-red-600 text-lg font-semibold flex items-center">
            <FontAwesomeIcon icon={faExclamationCircle} className="mr-2" />
            {errorMessage}
          </p>
        )}

        {balances && !loading && (
          <div className="mt-8 space-y-6">
            <BalanceDisplay
              nativeBalance={balances.nativeBalance.toFixed(4)}
              erc20Balances={balances.tokens}
              network={network}
              loading={loading}
              errorMessage={errorMessage}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
