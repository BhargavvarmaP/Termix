# Balance Viewer

Balance Viewer is a web-based application that allows users to view the native and ERC20 token balances for a specified wallet address across multiple blockchain networks, including Ethereum, Binance Smart Chain, Arbitrum, and Optimism. The project uses Moralis for blockchain data retrieval.

## Features

- **Check Wallet Balances**: View native cryptocurrency balances (ETH, BNB) and selected ERC20 token balances (USDT, WETH, 1INCH).
- **Multi-Network Support**: Supports Ethereum, Binance Smart Chain, Arbitrum, and Optimism.
- **Live Price Fetching**: Fetch and display live token prices for the supported ERC20 tokens.
- **Simple and Responsive UI**: User-friendly interface built with React, Tailwind CSS, and FontAwesome for icons.
- **Error Handling**: Display appropriate error messages for invalid wallet addresses or network selection.

## Technologies Used

- **React.js**: For the front-end user interface.
- **Moralis SDK**: For interacting with blockchain networks and fetching wallet balances.
- **Tailwind CSS**: For responsive and modern styling.
- **FontAwesome**: For icons used in the UI.
- **PropTypes**: For component prop validation.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or above)
- npm (Node package manager)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/BhargavvarmaP/Termix.git
   cd Termix
Install the required dependencies:

bash
npm install
Set up the environment variables by creating a .env file in the project root with the following content:

Start the development server:

bash
npm start
The application should now be running at http://localhost:3000.

Usage
Open the application and enter a valid wallet address.
Select a network from the dropdown (Ethereum, Binance Smart Chain, Arbitrum, or Optimism).
Click Check Balance to fetch the wallet's balances.
View the wallet's native balance and selected ERC20 token balances.
