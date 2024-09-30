import React, { createContext, useState, useEffect } from 'react';

export const WalletsContext = createContext();

export const WalletsProvider = ({ children }) => {
  const [wallets, setWallets] = useState(() => {
    // Lade Wallets aus dem localStorage, wenn vorhanden
    const savedWallets = localStorage.getItem('wallets');
    return savedWallets ? JSON.parse(savedWallets) : [];
  });

  useEffect(() => {
    // Speichere Wallets im localStorage, wenn sie sich ändern
    localStorage.setItem('wallets', JSON.stringify(wallets));
  }, [wallets]);

  const addWallet = (address) => {
    if (!wallets.find((wallet) => wallet.address.toLowerCase() === address.toLowerCase())) {
      setWallets([...wallets, { address, name: '' }]);
    }
  };

  const removeWallet = (address) => {
    setWallets(wallets.filter((wallet) => wallet.address !== address));
  };

  const renameWallet = (address, newName) => {
    setWallets(
      wallets.map((wallet) =>
        wallet.address === address ? { ...wallet, name: newName } : wallet
      )
    );
  };

  return (
    <WalletsContext.Provider value={{ wallets, addWallet, removeWallet, renameWallet }}>
      {children}
    </WalletsContext.Provider>
  );
};
