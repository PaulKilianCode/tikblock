// WalletInput.jsx
import { useState } from 'react';

const WalletInput = ({ onAddWallet }) => {
  const [wallet, setWallet] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (wallet) {
      onAddWallet(wallet);
      setWallet(''); // Reset the input field after submission
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={wallet} 
        onChange={(e) => setWallet(e.target.value)} 
        placeholder="Enter Ethereum Wallet Address" 
      />
      <button type="submit">Add Wallet</button>
    </form>
  );
};

export default WalletInput;
