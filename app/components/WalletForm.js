import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaArrowsAltH, FaEthereum, FaRocket } from 'react-icons/fa';

const WalletForm = ({ onSubmit, loading, errorMessage }) => {
  const [address, setAddress] = useState('');
  const [network, setNetwork] = useState('Ethereum');

  // Validate the wallet address format (basic validation)
  const isValidAddress = (addr) => /^0x[a-fA-F0-9]{40}$/.test(addr);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidAddress(address)) {
      alert('Please enter a valid wallet address.');
      return;
    }

    onSubmit(address, network);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-6 border border-gray-200">
      {/* Wallet Address Input */}
      <div className="relative">
        <label htmlFor="wallet-address" className="block text-sm font-medium text-gray-700 mb-2">
          Wallet Address
        </label>
        <input
  id="wallet-address"
  type="text"
  placeholder="0x..."
  value={address}
  onChange={(e) => setAddress(e.target.value)}
  className="block w-full border border-gray-300 rounded-lg p-4 bg-gradient-to-r from-white to-gray-100 text-gray-700 placeholder-gray-500 shadow-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:bg-gray-50 transition duration-200 ease-in-out"
  required
/>

      </div>

      {/* Network Selection */}
      <div className="relative">
        <label htmlFor="network" className="block text-sm font-medium text-gray-700 mb-2">
          Select Network
        </label>
        <select
  id="network"
  value={network}
  onChange={(e) => setNetwork(e.target.value)}
  className="block w-full border border-gray-300 rounded-lg p-3 bg-gradient-to-r from-blue-100 to-purple-100 text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 shadow-md hover:bg-gradient-to-r hover:from-blue-200 hover:to-purple-200"
>
  <option value="Ethereum" className="flex items-center text-blue-600 font-semibold">
    <FaEthereum className="mr-2 text-blue-500" /> Ethereum
  </option>
  <option value="Binance" className="flex items-center text-yellow-600 font-semibold">
    <FaEthereum className="mr-2 text-yellow-500" /> Binance Smart Chain
  </option>
  <option value="Arbitrum" className="flex items-center text-green-600 font-semibold">
    <FaArrowsAltH className="mr-2 text-green-500" /> Arbitrum
  </option>
  <option value="Optimism" className="flex items-center text-red-600 font-semibold">
    <FaRocket className="mr-2 text-red-500" /> Optimism
  </option>
</select>

      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className={`w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center">
            <svg className="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12c0-4.418 3.582-8 8-8s8 3.582-8 8H4z"></path>
            </svg>
            Fetching...
          </div>
        ) : (
          'Fetch Balances'
        )}
      </button>

      {/* Error Message */}
      {errorMessage && (
        <p className="text-red-500 text-sm text-center mt-2">
          {errorMessage}
        </p>
      )}
    </form>
  );
};

// PropTypes for type-checking props
WalletForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

export default WalletForm;
