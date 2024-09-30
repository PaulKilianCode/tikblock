import React, { useContext, useState } from 'react';
import { WalletsContext } from '../components/WalletsContext';
import Navbar from '../components/Navbar';
import AddWallet from '../components/AddWallet';
import WalletList from '../components/WalletList';

const Following = () => {
  const { wallets, removeWallet, renameWallet } = useContext(WalletsContext);
  const [editingWallet, setEditingWallet] = useState(null);
  const [newName, setNewName] = useState('');

  const handleRename = (wallet) => {
    setEditingWallet(wallet.address);
    setNewName(wallet.name || '');
  };

  const handleRenameSubmit = (address) => {
    renameWallet(address, newName);
    setEditingWallet(null);
    setNewName('');
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Navbar />
      <h2 className="text-2xl font-bold mb-4 text-center">Gefolgte Wallets</h2>
      <AddWallet /> {/* Hinzufügen der AddWallet-Komponente */}
      {wallets.length === 0 ? (
        <p className="text-center">Keine Wallets hinzugefügt.</p>
      ) : (
        <WalletList
          wallets={wallets}
          onRemoveWallet={removeWallet}
          onRenameWallet={handleRename}
          editingWallet={editingWallet}
          setEditingWallet={setEditingWallet}
          newName={newName}
          setNewName={setNewName}
          handleRenameSubmit={handleRenameSubmit}
        />
      )}
    </div>
  );
};

export default Following;
