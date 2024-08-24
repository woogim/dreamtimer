import { useState, useEffect } from 'react';

export const useDreamBank = () => {
  const [currentDreamBank, setCurrentDreamBank] = useState('');
  const [currentDreamPiece, setCurrentDreamPiece] = useState('');
  const [dreamBanks, setDreamBanks] = useState(() => {
    const storedDreamBanks = localStorage.getItem('dreamTimerDreamBanks');
    return storedDreamBanks ? JSON.parse(storedDreamBanks) : [];
  });
  const [showDreamBankPopup, setShowDreamBankPopup] = useState(false);

  useEffect(() => {
    localStorage.setItem('dreamTimerDreamBanks', JSON.stringify(dreamBanks));
  }, [dreamBanks]);

  const handleAddDreamBank = () => {
    if (currentDreamBank && !dreamBanks.some(db => db.name === currentDreamBank)) {
      setDreamBanks(prevBanks => [...prevBanks, { name: currentDreamBank, pieces: [] }]);
      setCurrentDreamBank('');
    }
  };

  const handleAddDreamPiece = () => {
    if (currentDreamPiece && currentDreamBank) {
      setDreamBanks(prevBanks => prevBanks.map(bank => 
        bank.name === currentDreamBank
          ? { ...bank, pieces: [...bank.pieces, currentDreamPiece] }
          : bank
      ));
      setCurrentDreamPiece('');
    }
  };

  return {
    currentDreamBank,
    currentDreamPiece,
    setCurrentDreamBank,
    setCurrentDreamPiece,
    dreamBanks,
    handleAddDreamBank,
    handleAddDreamPiece,
    showDreamBankPopup,
    setShowDreamBankPopup,
  };
};