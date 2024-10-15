import PropTypes from 'prop-types';

const BalanceDisplay = ({ nativeBalance, erc20Balances, network, loading, errorMessage }) => {
  // Map network names to their native token symbols
  const networkSymbols = {
    'Ethereum': 'ETH',
    'Binance': 'BNB',
    'Arbitrum': 'ETH',
    'Optimism': 'ETH',
  };

  // Get the correct symbol for the selected network
  const nativeSymbol = networkSymbols[network] || 'ETH';

  return (
    <div className="mt-4 p-6 border rounded-xl shadow-lg bg-gradient-to-r from-blue-100 via-purple-100 to-indigo-100 space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 flex items-center justify-center bg-indigo-500 text-white rounded-lg py-2 shadow-md">
        Wallet Balances
      </h2>

      {loading ? (
        <p className="text-center text-blue-500 font-medium animate-pulse">
          Loading balances...
        </p>
      ) : errorMessage ? (
        <p className="text-center text-red-500 font-medium">
          {errorMessage}
        </p>
      ) : (
        <div>
          {/* Native Balance Display */}
          <div className="flex items-center justify-between py-3 px-4 bg-white shadow-md rounded-lg">
            <p className="font-bold text-gray-700">
              Native Balance:
            </p>
            <p className="text-xl text-indigo-600 font-semibold">
              {nativeBalance ? `${nativeBalance} ${nativeSymbol}` : `0 ${nativeSymbol}`}
            </p>
          </div>

          {/* ERC20 Token Balances */}
          <div className="mt-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">ERC20 Token Balances</h3>
            {erc20Balances.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                {erc20Balances.map((token) => (
                  <div
                    key={token.symbol}
                    className="flex items-center justify-between py-3 px-4 bg-white shadow-md rounded-lg hover:bg-purple-50 transition-all"
                  >
                    <p className="font-medium text-gray-700">
                      {token.symbol}:
                    </p>
                    <p className="text-lg text-indigo-600 font-semibold">
                      {token.balance.toFixed(4)} {token.symbol}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                No ERC20 tokens found.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// PropTypes for type-checking props
BalanceDisplay.propTypes = {
  nativeBalance: PropTypes.string,
  erc20Balances: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired, // Changed to number for better control over decimals
    })
  ).isRequired,
  network: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

export default BalanceDisplay;
