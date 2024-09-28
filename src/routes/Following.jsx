import { useState } from 'react';
import WalletInput from '../components/WalletInput';
import WalletList from '../components/WalletList';

const Following = () => {
  const [wallets, setWallets] = useState([]);

  const addWallet = (newWallet) => {
    if (!wallets.includes(newWallet)) {
      setWallets([...wallets, newWallet]);
    } else {
      // Optional: Du kannst hier eine Meldung hinzufügen, wenn die Wallet bereits vorhanden ist
      alert('Wallet is already followed');
    }
  };

  const removeWallet = (walletToRemove) => {
    setWallets(wallets.filter((wallet) => wallet !== walletToRemove));
  };

  return (
    <div>
      <h2>Followed Wallets</h2>
      <WalletInput onAddWallet={addWallet} />
      <WalletList wallets={wallets} onRemoveWallet={removeWallet} />
    </div>
  );
};

export default Following;
