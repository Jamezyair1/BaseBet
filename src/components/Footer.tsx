import React from 'react';
import { Github } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">Base Bet</h3>
            <p className="text-sm">Professional football betting on the Base network.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul className="text-sm">
              <li><a href="/" className="hover:text-blue-400">Home</a></li>
              <li><a href="/matches" className="hover:text-blue-400">Matches</a></li>
              <li><a href="/withdrawals" className="hover:text-blue-400">Withdrawals</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="https://github.com/base-bet" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                <Github size={24} />
              </a>
              {/* Add more social icons as needed */}
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2024 Base Bet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;