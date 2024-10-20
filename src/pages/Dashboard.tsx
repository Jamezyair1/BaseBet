import React from 'react';
import { useWallet } from '../contexts/WalletContext';
import { Link } from 'react-router-dom';
import { TrendingUp, TrendingDown, Clock } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { account, balance, connectWallet } = useWallet();

  // Mock data for active bets and past bets
  const activeBets = [
    { id: 1, match: 'Manchester United vs Liverpool', amount: 0.1, odds: 2.5 },
    { id: 2, match: 'Barcelona vs Real Madrid', amount: 0.05, odds: 1.8 },
  ];

  const pastBets = [
    { id: 3, match: 'Bayern Munich vs Borussia Dortmund', amount: 0.2, odds: 1.9, result: 'Won' },
    { id: 4, match: 'PSG vs Marseille', amount: 0.15, odds: 2.2, result: 'Lost' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {account ? (
        <>
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Wallet Overview</h2>
            <p className="text-lg">Balance: <span className="font-bold">{balance} ETH</span></p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Active Bets</h2>
              <ul className="space-y-4">
                {activeBets.map((bet) => (
                  <li key={bet.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{bet.match}</p>
                      <p className="text-sm text-gray-600">Amount: {bet.amount} ETH</p>
                    </div>
                    <span className="text-blue-600 font-semibold">x{bet.odds}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Past Bets</h2>
              <ul className="space-y-4">
                {pastBets.map((bet) => (
                  <li key={bet.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{bet.match}</p>
                      <p className="text-sm text-gray-600">Amount: {bet.amount} ETH</p>
                    </div>
                    <span className={`font-semibold ${bet.result === 'Won' ? 'text-green-600' : 'text-red-600'}`}>
                      {bet.result === 'Won' ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                      {bet.result}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Matches</h2>
            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Chelsea vs Arsenal</p>
                  <p className="text-sm text-gray-600">Premier League</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>Tomorrow, 20:00 GMT</span>
                </div>
              </li>
              <li className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Juventus vs Inter Milan</p>
                  <p className="text-sm text-gray-600">Serie A</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span>Saturday, 18:45 GMT</span>
                </div>
              </li>
            </ul>
            <Link to="/matches" className="mt-4 inline-block text-blue-600 hover:underline">View all matches</Link>
          </div>
        </>
      ) : (
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <p className="text-xl mb-4">Connect your wallet to view your dashboard</p>
          <button
            onClick={connectWallet}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Connect Wallet
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;