// TransactionItem.jsx
import React from 'react';
import { formatUnits } from 'ethers';

const formatEther = (weiAmount) => formatUnits(weiAmount, 'ether');

const TransactionItem = ({ transaction, followedWallets }) => {
  // Bestimme, ob die Transaktion eingehend oder ausgehend ist
  const isIncoming = followedWallets.some(
    (wallet) => wallet.address.toLowerCase() === transaction.to.toLowerCase()
  );

  // Definiere die Farbe basierend auf der Transaktionsrichtung
  const boxColor = isIncoming ? 'bg-green-100' : 'bg-red-100';

  // Funktion zum Abrufen des Namens oder der Adresse
  const getWalletDisplayName = (address) => {
    const wallet = followedWallets.find(
      (w) => w.address.toLowerCase() === address.toLowerCase()
    );
    return wallet && wallet.name ? wallet.name : address;
  };

  return (
    <div className={`border-l-4 ${boxColor} p-4 mb-4 rounded`}>
      <p>
        <strong>Von:</strong> {getWalletDisplayName(transaction.from)}
      </p>
      <p>
        <strong>An:</strong> {getWalletDisplayName(transaction.to)}
      </p>
      <p>
        <strong>Betrag:</strong> {formatEther(transaction.value)} ETH
      </p>
      <p>
        <strong>Datum:</strong> {new Date(transaction.timeStamp * 1000).toLocaleString()}
      </p>
    </div>
  );
};

export default TransactionItem;
