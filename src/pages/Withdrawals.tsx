import React, { useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { AlertCircle, CheckCircle } from 'lucide-react';

const Withdrawals: React.FC = () => {
  const { account, balance } = useWallet();
  const [withdrawAmount, setWithdrawAmount] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleWithdraw = async () => {
    if (!account) {
      setError('Please connect your wallet to make a withdrawal.');
      return;
    }

    if (!withdrawAmount || parseFloat(withdrawAmount) <= 0) {
      setError('Please enter a valid withdrawal amount.');
      return;
    }

    if (parseFloat(withdrawAmount) > parseFloat(balance)) {
      setError('Insufficient balance for withdrawal.');
      return;
    }

    // Here you would typically interact with a smart contract to process the withdrawal
    console.log('Processing withdrawal:', withdrawAmount);

    // Simulate a successful withdrawal
    setSuccess(true);
    setError(null);
    setWithdrawAmount('');

    // Reset success message after 5 seconds
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Withdrawals</h1>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Your Balance</h2>
        <p className="text-2xl font-bold mb-6">{balance} ETH</p>

        <div className="mb-6">
          <label htmlFor="withdrawAmount" className="block text-sm font-medium text-gray-700 mb-2">
            Withdrawal Amount (ETH)
          </label>
          <input
            type="number"
            id="withdrawAmount"
            value={withdrawAmount}
            onChange={(e) => {
              setWithdrawAmount(e.target.value);
              setError(null);
            }}
            className="w-full p-2 border border-gray-300 rounded-md"
            step="0.01"
            min="0"
          />
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-center">
            <AlertCircle size={20} className="mr-2" />
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md flex items-center">
            <CheckCircle size={20} className="mr-2" />
            Withdrawal processed successfully!
          </div>
        )}

        <button
          onClick={handleWithdraw}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Withdraw
        </button>

        <div className="mt-6 text-sm text-gray-600">
          <h3 className="font-semibold mb-2">Withdrawal Information:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Withdrawals are processed on the Base network for low transaction fees.</li>
            <li>The minimum withdrawal amount is 0.01 ETH.</li>
            <li>Withdrawals are typically processed within 1-2 hours.</li>
            <li>For large withdrawals, additional verification may be required.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Withdrawals;