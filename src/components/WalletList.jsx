import { useState } from 'react';
import { ethers } from 'ethers';
import WalletInput from './WalletInput';
import WalletList from './WalletList';

const Following = () => {
  const [wallets, setWallets] = useState([]);
  const [error, setError] = useState('');

  const validateWallet = async (wallet) => {
    try {
      // Prüfe, ob die eingegebene Wallet-Adresse gültig ist
      if (ethers.utils.isAddress(wallet)) {
        return true;
      } else {
        throw new Error('Invalid Ethereum address');
      }
    } catch (error) {
      setError(error.message);
      return false;
    }
  };

  const addWallet = async (newWallet) => {
    // Prüfe zuerst die Wallet-Validität mit der Ethereum API (ethers.js)
    const isValid = await validateWallet(newWallet);
    if (isValid && !wallets.includes(newWallet)) {
      setWallets([...wallets, newWallet]);
      setError(''); // Reset any errors
    }
  };

  const removeWallet = (walletToRemove) => {
    setWallets(wallets.filter((wallet) => wallet !== walletToRemove));
  };

  return (
    <div>
      <h2>Followed Wallets</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <WalletInput onAddWallet={addWallet} />
      <WalletList wallets={wallets} onRemoveWallet={removeWallet} />
    </div>
  );
};

export default Following;
