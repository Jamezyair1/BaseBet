import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';

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

const Matches: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call to fetch matches
    const fetchMatches = async () => {
      // In a real application, this would be an API call
      const mockMatches: Match[] = [
        {
          id: 1,
          homeTeam: 'Manchester United',
          awayTeam: 'Liverpool',
          league: 'Premier League',
          date: '2024-03-20',
          time: '20:00',
          odds: { home: 2.5, draw: 3.2, away: 2.8 }
        },
        {
          id: 2,
          homeTeam: 'Barcelona',
          awayTeam: 'Real Madrid',
          league: 'La Liga',
          date: '2024-03-21',
          time: '21:00',
          odds: { home: 2.1, draw: 3.4, away: 3.1 }
        },
        {
          id: 3,
          homeTeam: 'Bayern Munich',
          awayTeam: 'Borussia Dortmund',
          league: 'Bundesliga',
          date: '2024-03-22',
          time: '18:30',
          odds: { home: 1.8, draw: 3.6, away: 4.2 }
        },
        {
          id: 4,
          homeTeam: 'PSG',
          awayTeam: 'Marseille',
          league: 'Ligue 1',
          date: '2024-03-23',
          time: '20:45',
          odds: { home: 1.6, draw: 3.8, away: 5.0 }
        },
      ];

      setMatches(mockMatches);
      setLoading(false);
    };

    fetchMatches();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading matches...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Upcoming Matches</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {matches.map((match) => (
          <div key={match.id} className="bg-white shadow-md rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-semibold text-gray-600">{match.league}</span>
              <div className="flex items-center text-sm text-gray-600">
                <Clock size={16} className="mr-1" />
                <span>{match.date} {match.time}</span>
              </div>
            </div>
            <h2 className="text-xl font-bold mb-4">{match.homeTeam} vs {match.awayTeam}</h2>
            <div className="flex justify-between items-center mb-4">
              <div className="space-y-1">
                <p className="text-sm font-medium">Home: <span className="font-bold">{match.odds.home}</span></p>
                <p className="text-sm font-medium">Draw: <span className="font-bold">{match.odds.draw}</span></p>
                <p className="text-sm font-medium">Away: <span className="font-bold">{match.odds.away}</span></p>
              </div>
              <Link
                to={`/place-bet/${match.id}`}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 flex items-center"
              >
                Place Bet <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Matches;