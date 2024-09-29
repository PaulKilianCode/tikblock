// TransactionItem.jsx
import React from 'react';
import { formatUnits } from 'ethers'; // Importiere formatUnits

const formatEther = (weiAmount) => formatUnits(weiAmount, 'ether');

const TransactionItem = ({ transaction }) => {
  return (
    <div>
      <p>Von: {transaction.from}</p>
      <p>An: {transaction.to}</p>
      <p>Betrag: {formatEther(transaction.value)} ETH</p>
      <p>Datum: {new Date(transaction.timeStamp * 1000).toLocaleString()}</p>
    </div>
  );
};

export default TransactionItem;
