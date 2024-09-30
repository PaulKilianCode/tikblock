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
      try {
        const response = await axios.get('https://api.etherscan.io/api', {
          params: {
            module: 'account',
            action: 'txlist',
            address: wallet.address, // Stelle sicher, dass du wallet.address verwendest
            startblock: 0,
            endblock: 99999999,
            page: 1,
            offset: 5, // Anzahl der Transaktionen pro Wallet
            sort: 'desc',
            apikey: apiKey,
          },
        });

        if (response.data.status === '1') {
          allTransactions.push(...response.data.result);
        } else {
          console.warn(`Keine Transaktionen für Wallet ${wallet.address} gefunden.`);
        }
      } catch (error) {
        console.error(`Fehler beim Abrufen der Transaktionen für Wallet ${wallet.address}:`, error);
      }
    }

    // Transaktionen nach Zeitstempel sortieren
    allTransactions.sort((a, b) => b.timeStamp - a.timeStamp);

    return allTransactions; // Stelle sicher, dass ein Array zurückgegeben wird
  };

  const { data: transactions = [], isLoading, error } = useQuery({
    queryKey: ['transactions', wallets],
    queryFn: fetchTransactions,
    enabled: wallets.length > 0,
    refetchInterval: 5000, // Aktualisiere alle 5 Sekunden
  });

  if (wallets.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-center">
        <Navbar />
        <h2 className="text-2xl font-bold mb-4">Aktuelle Transaktionen</h2>
        <p>
          Aktuell folgst du keine Wallet. Füge unter{' '}
          <a href="/following" className="text-blue-500 underline">
            Following
          </a>{' '}
          eine valide Ethereum Wallet hinzu.
        </p>
      </div>
    );
  }

  if (isLoading) return <p>Lade Transaktionen...</p>;
  if (error) return <p>Fehler beim Laden der Transaktionen: {error.message}</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Navbar />
      <h2 className="text-2xl font-bold mb-4 text-center">Aktuelle Transaktionen</h2>
      {transactions.length === 0 ? (
        <p>Keine Transaktionen gefunden.</p>
      ) : (
        transactions.map((tx) => (
          <TransactionItem key={tx.hash} transaction={tx} followedWallets={wallets} />
        ))
      )}
    </div>
  );
};

export default TikBlock;
