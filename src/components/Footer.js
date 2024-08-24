import React from 'react';

const Footer = ({ theme }) => {
  const isDarkTheme = theme === 'dark';

  return (
    <footer className={`bg-gray-800 ${isDarkTheme ? 'text-gray-400' : 'text-gray-300'} w-full px-4 sm:px-6 lg:px-8 py-8`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">About NBA Prediction Hub</h3>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam consectetur sem non metus convallis, in mattis erat tempus. Nulla facilisi.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="text-sm">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#about-us" className="hover:underline">About Us</a></li>
            <li><a href="#bet-predictions" className="hover:underline">Bet Predictions</a></li>
            <li><a href="#about-us" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-4 text-center">
        <p>&copy; {new Date().getFullYear()} NBA Prediction Hub. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
