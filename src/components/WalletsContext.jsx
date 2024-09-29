// WalletsContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const WalletsContext = createContext();

export const WalletsProvider = ({ children }) => {
  const [wallets, setWallets] = useState(() => {
    // Initialisiere den State mit den Wallets aus dem localStorage
    const storedWallets = localStorage.getItem('wallets');
    return storedWallets ? JSON.parse(storedWallets) : [];
  });

  // Speichere die Wallets im localStorage, wenn sie sich ändern
  useEffect(() => {
    localStorage.setItem('wallets', JSON.stringify(wallets));
  }, [wallets]);

  return (
    <WalletsContext.Provider value={{ wallets, setWallets }}>
      {children}
    </WalletsContext.Provider>
  );
};
