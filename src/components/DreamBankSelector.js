import React from 'react';
import { Plus } from 'lucide-react';

const DreamBankSelector = ({
  isRunning,
  currentDreamBank,
  currentDreamPiece,
  setCurrentDreamBank,
  setCurrentDreamPiece,
  handleAddDreamBank,
  handleAddDreamPiece,
  dreamBanks,
  showDreamBankPopup,
  setShowDreamBankPopup
}) => {
  return (
    <>
      {!isRunning && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            꿈 저금통
          </label>
          <div className="flex">
            <input
              type="text"
              value={currentDreamBank}
              onChange={(e) => setCurrentDreamBank(e.target.value)}
              className="flex-grow p-2 border rounded-l-md"
              placeholder="새 꿈 저금통 이름"
              disabled={isRunning}
            />
            <button
              onClick={handleAddDreamBank}
              className="bg-blue-500 text-white p-2 rounded-r-md"
              disabled={isRunning}
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
          <button
            onClick={() => setShowDreamBankPopup(true)}
            className="mt-2 w-full bg-blue-100 text-blue-800 py-2 px-4 rounded-md hover:bg-blue-200 transition-all"
            disabled={isRunning}
          >
            저장된 꿈 저금통 선택
          </button>
        </div>
      )}

      {currentDreamBank && !isRunning && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            꿈 조각
          </label>
          <div className="flex">
            <input
              type="text"
              value={currentDreamPiece}
              onChange={(e) => setCurrentDreamPiece(e.target.value)}
              className="flex-grow p-2 border rounded-l-md"
              placeholder="새 꿈 조각 이름"
              disabled={isRunning}
            />
            <button
              onClick={handleAddDreamPiece}
              className="bg-blue-500 text-white p-2 rounded-r-md"
              disabled={isRunning}
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>
          <select
            value={currentDreamPiece}
            onChange={(e) => setCurrentDreamPiece(e.target.value)}
            className="mt-2 w-full p-2 border rounded-md"
            disabled={isRunning}
          >
            <option value="">저장된 꿈 조각 선택</option>
            {dreamBanks.find(db => db.name === currentDreamBank)?.pieces.map((piece, index) => (
              <option key={index} value={piece}>{piece}</option>
            ))}
          </select>
        </div>
      )}

      {isRunning && (
        <div className="mb-4 text-center">
          <span role="img" aria-label="piggy bank" className="text-3xl mr-2">🏦</span>
          <span className="text-xl text-gray-600">{currentDreamBank}</span><div></div>
          <span role="img" aria-label="puzzle piece" className="text-3xl mr-2">🧩</span>
          <span className="text-xl text-gray-600">{currentDreamPiece}</span>
        </div>
      )}
        { showDreamBankPopup && 'test' }
      {showDreamBankPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-lg font-bold mb-4">꿈 저금통 선택</h2>
            <ul>
              {dreamBanks.map((bank, index) => (
                <li 
                  key={index} 
                  className="cursor-pointer hover:bg-gray-100 p-2"
                  onClick={() => {
                    setCurrentDreamBank(bank.name);
                    setShowDreamBankPopup(false);
                  }}
                >
                  {bank.name}
                </li>
              ))}
            </ul>
            <button 
              className="mt-4 bg-blue-500 text-white p-2 rounded"
              onClick={() => setShowDreamBankPopup(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DreamBankSelector;