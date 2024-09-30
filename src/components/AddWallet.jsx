import React, { useState, useContext } from 'react';
import { isAddress } from 'ethers'; // Für Version 6
// Für Version 5: import { utils } from 'ethers';
import { WalletsContext } from './WalletsContext';


const AddWallet = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { addWallet } = useContext(WalletsContext);

  // Validierungsfunktion
  const isValidEthereumAddress = (address) => {
    return isAddress(address);
    // Für Version 5: return utils.isAddress(address);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (walletAddress.trim() === '') {
      setErrorMessage('Bitte eine Wallet-Adresse eingeben.');
      return;
    }

    if (!isValidEthereumAddress(walletAddress.trim())) {
      setErrorMessage('Ungültige Ethereum-Adresse.');
      return;
    }

    addWallet(walletAddress.trim());
    setWalletAddress('');
    setErrorMessage('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex mb-4">
        <input
          type="text"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className="border p-2 flex-grow mr-2"
          placeholder="Wallet-Adresse eingeben"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Hinzufügen
        </button>
      </form>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
    </div>
  );
};

export default AddWallet;
