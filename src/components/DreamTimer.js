// src/components/DreamTimer.js
import React, { useState, useEffect } from 'react';
import { Menu, Settings } from 'lucide-react';
import TimerDisplay from './TimerDisplay';
import DreamBankSelector from './DreamBankSelector';
import ControlButtons from './ControlButtons';
import HistoryTable from './HistoryTable';
import SettingsPanel from './SettingsPanel';
import CompletionAnimation from './CompletionAnimation';
import WelcomePopup from './WelcomePopup';
import { useTimer } from '../hooks/useTimer';
import { useDreamBank } from '../hooks/useDreamBank';

const DreamTimer = () => {
  const [showHistory, setShowHistory] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [showWelcomePopup, setShowWelcomePopup] = useState(false);
  
  const {
    currentDreamBank,
    currentDreamPiece,
    setCurrentDreamBank,
    setCurrentDreamPiece,
    dreamBanks,
    handleAddDreamBank,
    handleAddDreamPiece,
    showDreamBankPopup,
    setShowDreamBankPopup,
  } = useDreamBank();

  const { 
    time, 
    isRunning, 
    earnedMoney, 
    currentStage,
    handleStart, 
    handlePause, 
    handleReset, 
    handleFocusLoss,
    showCompletionAnimation,
  } = useTimer(currentDreamBank, currentDreamPiece);

  const handleTimerStart = () => {
    setSessionStarted(true);
    handleStart();
  };

  const handleTimerReset = () => {
    setSessionStarted(false);
    handleReset();
  };

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem('dreamTimerVisited');
    if (!hasVisitedBefore) {
      setShowWelcomePopup(true);
      localStorage.setItem('dreamTimerVisited', 'true');
    }
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-100 to-white p-4">
      {showWelcomePopup && <WelcomePopup onClose={() => setShowWelcomePopup(false)} />}
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => setShowHistory(!showHistory)} className="text-gray-600">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-medium text-gray-700">꿈 타이머</h1>
        <button onClick={() => setShowSettings(!showSettings)}>
          <Settings className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {showHistory ? (
        <HistoryTable />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-lg w-full max-w-md">
            {showSettings ? (
              <SettingsPanel />
            ) : (
              <>
                <DreamBankSelector
                  isRunning={sessionStarted}
                  currentDreamBank={currentDreamBank}
                  currentDreamPiece={currentDreamPiece}
                  setCurrentDreamBank={setCurrentDreamBank}
                  setCurrentDreamPiece={setCurrentDreamPiece}
                  handleAddDreamBank={handleAddDreamBank}
                  handleAddDreamPiece={handleAddDreamPiece}
                  dreamBanks={dreamBanks}
                  showDreamBankPopup={showDreamBankPopup}
                  setShowDreamBankPopup={setShowDreamBankPopup}
                />
                <TimerDisplay
                  time={time}
                  currentStage={currentStage}
                  isRunning={isRunning}
                  earnedMoney={earnedMoney}
                />
                <ControlButtons
                  isRunning={isRunning}
                  handleStart={handleTimerStart}
                  handlePause={handlePause}
                  handleReset={handleTimerReset}
                  handleFocusLoss={handleFocusLoss}
                />
              </>
            )}
          </div>
        </div>
      )}
      <CompletionAnimation show={showCompletionAnimation} />
    </div>
  );
};

export default DreamTimer;