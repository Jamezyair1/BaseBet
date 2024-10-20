import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import { ArrowLeft, AlertCircle } from 'lucide-react';

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  league: string;
  date: string;
  time: string;
  odds: {
    home: number;
    draw: number;
    away: number;
  };
}

const PlaceBet: React.FC = () => {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const { account, balance } = useWallet();
  const [match, setMatch] = useState<Match | null>(null);
  const [selectedOutcome, setSelectedOutcome] = useState<'home' | 'draw' | 'away' | null>(null);
  const [betAmount, setBetAmount] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulating API call to fetch match details
    const fetchMatchDetails = async () => {
      // In a real application, this would be an API call using the matchId
      const mockMatch: Match = {
        id: parseInt(matchId || '0'),
        homeTeam: 'Manchester United',
        awayTeam: 'Liverpool',
        league: 'Premier League',
        date: '2024-03-20',
        time: '20:00',
        odds: { home: 2.5, draw: 3.2, away: 2.8 }
      };

      setMatch(mockMatch);
    };

    fetchMatchDetails();
  }, [matchId]);

  const handleOutcomeSelect = (outcome: 'home' | 'draw' | 'away') => {
    setSelectedOutcome(outcome);
    setError(null);
  };

  const handleBetAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBetAmount(e.target.value);
    setError(null);
  };

  const handlePlaceBet = async () => {
    if (!account) {
      setError('Please connect your wallet to place a bet.');
      return;
    }

    if (!selectedOutcome) {
      setError('Please select an outcome.');
      return;
    }

    if (!betAmount || parseFloat(betAmount) <= 0) {
      setError('Please enter a valid bet amount.');
      return;
    }

    if (parseFloat(betAmount) > parseFloat(balance)) {
      setError('Insufficient balance.');
      return;
    }

    // Here you would typically interact with a smart contract to place the bet
    console.log('Placing bet:', {
      matchId,
      outcome: selectedOutcome,
      amount: betAmount
    });

    // Simulate a successful bet placement
    alert('Bet placed successfully!');
    navigate('/');
  };

  if (!match) {
    return <div className="text-center py-8">Loading match details...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-blue-600 hover:underline"
      >
        <ArrowLeft size={20} className="mr-1" /> Back to Matches
      </button>

      <h1 className="text-3xl font-bold mb-6">Place Your Bet</h1>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{match.homeTeam} vs {match.awayTeam}</h2>
        <p className="text-gray-600 mb-2">{match.league}</p>
        <p className="text-gray-600 mb-4">{match.date} {match.time}</p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <button
            onClick={() => handleOutcomeSelect('home')}
            className={`p-4 rounded-md text-center ${
              selectedOutcome === 'home'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <div className="font-semibold">{match.homeTeam}</div>
            <div className="text-lg font-bold">{match.odds.home}</div>
          </button>
          <button
            onClick={() => handleOutcomeSelect('draw')}
            className={`p-4 rounded-md text-center ${
              selectedOutcome === 'draw'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <div className="font-semibold">Draw</div>
            <div className="text-lg font-bold">{match.odds.draw}</div>
          </button>
          <button
            onClick={() => handleOutcomeSelect('away')}
            className={`p-4 rounded-md text-center ${
              selectedOutcome === 'away'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            <div className="font-semibold">{match.awayTeam}</div>
            <div className="text-lg font-bold">{match.odds.away}</div>
          </button>
        </div>

        <div className="mb-6">
          <label htmlFor="betAmount" className="block text-sm font-medium text-gray-700 mb-2">
            Bet Amount (ETH)
          </label>
          <input
            type="number"
            id="betAmount"
            value={betAmount}
            onChange={handleBetAmountChange}
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

        <button
          onClick={handlePlaceBet}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Place Bet
        </button>
      </div>
    </div>
  );
};

export default PlaceBet;