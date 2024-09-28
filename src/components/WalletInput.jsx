import { useState } from 'react';
/* import { ethers } from 'ethers'; */
import { isAddress } from 'ethers';

const WalletInput = ({ onAddWallet }) => {
  const [wallet, setWallet] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (wallet) {
      if (isAddress(wallet)) {
        onAddWallet(wallet);
        setWallet(''); // Eingabefeld zurücksetzen
        setError('');  // Fehler zurücksetzen
      } else {
        setError('Invalid Ethereum address');
      }
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default WalletInput;
