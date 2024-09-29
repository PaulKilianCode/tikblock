// Following.jsx
import React, { useContext } from 'react';
import WalletInput from '../components/WalletInput';
import WalletList from '../components/WalletList';
import { WalletsContext } from '../components/WalletsContext';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { formatUnits } from 'ethers';

const apiKey = import.meta.env.VITE_ETHERSCAN_API_KEY;

const Following = () => {
  const { wallets, setWallets } = useContext(WalletsContext);

  const formatEther = (weiAmount) => formatUnits(weiAmount, 'ether');

  const addWallet = async (newWallet) => {
    if (!wallets.includes(newWallet)) {
      // Füge die Wallet zur Liste hinzu
      setWallets([...wallets, newWallet]);

      // Letzte Transaktion abrufen
      try {
        const response = await axios.get('https://api.etherscan.io/api', {
          params: {
            module: 'account',
            action: 'txlist',
            address: newWallet,
            startblock: 0,
            endblock: 99999999,
            page: 1,
            offset: 1, // Nur die letzte Transaktion
            sort: 'desc',
            apikey: apiKey,
          },
        });

        console.log('API-Antwort:', response.data);

        if (response.data.status === '1' && response.data.result.length > 0) {
          const lastTransaction = response.data.result[0];
          alert(`Letzte Transaktion von ${newWallet}:\nVon: ${lastTransaction.from}\nAn: ${lastTransaction.to}\nBetrag: ${formatEther(lastTransaction.value)} ETH\nDatum: ${new Date(lastTransaction.timeStamp * 1000).toLocaleString()}`);
        } else {
          alert(`Keine Transaktionen für Wallet ${newWallet} gefunden.`);
        }
      } catch (error) {
        console.error('Fehler beim Abrufen der Transaktionen:', error);
        alert('Fehler beim Abrufen der Transaktionen. Bitte versuche es später erneut.');
      }
    } else {
      alert('Diese Wallet wird bereits verfolgt.');
    }
  };

  const removeWallet = (walletToRemove) => {
    setWallets(wallets.filter((wallet) => wallet !== walletToRemove));
  };

  return (
    <div>
      <Navbar />
      <h2>Gefolgte Wallets</h2>
      <WalletInput onAddWallet={addWallet} />
      <WalletList wallets={wallets} onRemoveWallet={removeWallet} />
    </div>
  );
};

export default Following;
