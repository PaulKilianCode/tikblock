import React from 'react';

const WalletList = ({ wallets = [], onRemoveWallet }) => {
  console.log('WalletList received wallets:', wallets);

  if (!Array.isArray(wallets)) {
    return <p>No wallets to display.</p>;
  }

  return (
    <ul>
      {wallets.map((wallet) => (
        <li key={wallet}>
          {wallet}
          <button onClick={() => onRemoveWallet(wallet)}>Remove</button>
        </li>
      ))}
    </ul>
  );
};

export default WalletList;
