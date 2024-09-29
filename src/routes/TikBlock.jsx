// TikBlock.jsx
import React, { useContext } from 'react';
import { WalletsContext } from '../components/WalletsContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import TransactionItem from '../components/TransactionItem';
import Navbar from '../components/Navbar';

const apiKey = import.meta.env.VITE_ETHERSCAN_API_KEY;

const TikBlock = () => {
  const { wallets } = useContext(WalletsContext);

  const fetchTransactions = async () => {
    const allTransactions = [];

    for (const wallet of wallets) {
      const response = await axios.get('https://api.etherscan.io/api', {
        params: {
          module: 'account',
          action: 'txlist',
          address: wallet,
          startblock: 0,
          endblock: 99999999,
          page: 1,
          offset: 1, // Nur die letzte Transaktion abrufen
          sort: 'desc',
          apikey: apiKey,
        },
      });

      console.log(`API-Antwort für Wallet ${wallet}:`, response.data); // API-Antwort in der Konsole ausgeben

      if (response.data.status === '1') {
        allTransactions.push(...response.data.result);
      } else {
        console.warn(`Keine Transaktionen für Wallet ${wallet} gefunden.`);
      }
    }

    allTransactions.sort((a, b) => b.timeStamp - a.timeStamp);
    return allTransactions;
  };

  const { data: transactions = [], isLoading, error } = useQuery({
    queryKey: ['transactions', wallets],
    queryFn: fetchTransactions,
    enabled: wallets.length > 0,
    refetchInterval: 5000, // Aktualisiere alle 5 Sekunden
  });

  if (isLoading) return <p>Lade Transaktionen...</p>;
  if (error) return <p>Fehler beim Laden der Transaktionen</p>;

  return (
    <div>
      <Navbar />
      <h2>Aktuelle Transaktionen</h2>
      {transactions.length === 0 ? (
        <p>Keine Transaktionen gefunden.</p>
      ) : (
        transactions.map((tx) => (
          <TransactionItem key={tx.hash} transaction={tx} />
        ))
      )}
    </div>
  );
};

export default TikBlock;
