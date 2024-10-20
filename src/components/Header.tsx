import React from 'react';
import { Link } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { Trophy, Wallet } from 'lucide-react';

const Header: React.FC = () => {
  const { account, balance, connectWallet } = useWallet();

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold">
          <Trophy size={32} />
          <span>Base Bet</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li><Link to="/" className="hover:text-blue-200">Dashboard</Link></li>
            <li><Link to="/matches" className="hover:text-blue-200">Matches</Link></li>
            <li><Link to="/withdrawals" className="hover:text-blue-200">Withdrawals</Link></li>
          </ul>
        </nav>
        <div className="flex items-center space-x-4">
          {account ? (
            <div className="flex items-center space-x-2">
              <Wallet size={20} />
              <span>{balance} ETH</span>
              <span className="text-sm">{`${account.slice(0, 6)}...${account.slice(-4)}`}</span>
            </div>
          ) : (
            <button
              onClick={connectWallet}
              className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 transition duration-300"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;