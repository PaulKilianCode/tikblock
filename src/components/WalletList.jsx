import React from 'react';

const WalletList = ({
  wallets = [],
  onRemoveWallet,
  onRenameWallet,
  editingWallet,
  newName,
  setNewName,
  handleRenameSubmit,
  setEditingWallet,
}) => {
  return (
    <ul>
      {wallets.map((wallet) => (
        <li
          key={wallet.address}
          className="bg-gray-100 p-4 mb-4 rounded"
        >
          {editingWallet === wallet.address ? (
            <div className="flex items-center">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border p-2 mr-2 flex-grow"
                placeholder="Name eingeben"
              />
              <button
                onClick={() => handleRenameSubmit(wallet.address)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
              >
                Speichern
              </button>
              <button
                onClick={() => setEditingWallet(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Abbrechen
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="break-all">
                {wallet.name ? `${wallet.name} - ${wallet.address}` : wallet.address}
              </span>
              <div>
                <button
                  onClick={() => onRenameWallet(wallet)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
                >
                  Umbenennen
                </button>
                <button
                  onClick={() => onRemoveWallet(wallet.address)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Entfernen
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default WalletList;
