// src/components/DreamTimer.js
import React, { useState, useEffect } from 'react';
import { Menu, Settings, HelpCircle } from 'lucide-react';
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
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  
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
    progress,  // Add this line
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
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-200 via-purple-100 to-pink-200 p-4 sm:p-8">
      {showWelcomePopup && <WelcomePopup onClose={() => setShowWelcomePopup(false)} />}
      {showHelpPopup && <WelcomePopup onClose={() => setShowHelpPopup(false)} />}
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => setShowHistory(!showHistory)} className="text-gray-600 hover:text-gray-800 transition-colors">
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-3xl font-bold text-gray-800 tracking-wide">꿈 타이머</h1>
        <div className="flex items-center space-x-4">
          <button onClick={() => setShowHelpPopup(true)} className="text-gray-600 hover:text-gray-800 transition-colors">
            <HelpCircle className="w-6 h-6" />
          </button>
          <button onClick={() => setShowSettings(!showSettings)} className="text-gray-600 hover:text-gray-800 transition-colors">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </div>

      {showHistory ? (
        <HistoryTable />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-xl w-full max-w-md transition-all duration-300 hover:shadow-2xl border border-white border-opacity-30">
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
                  progress={progress}  // Add this line
                  className="my-8 text-4xl font-bold text-gray-800"
                />
                <ControlButtons
                  isRunning={isRunning}
                  handleStart={handleTimerStart}
                  handlePause={handlePause}
                  handleReset={handleTimerReset}
                  handleFocusLoss={handleFocusLoss}
                  className="mt-8 space-x-4"
                  buttonClassName="px-6 py-2 rounded-full text-white font-semibold transition-colors"
                  startButtonClassName="bg-green-500 hover:bg-green-600"
                  pauseButtonClassName="bg-yellow-500 hover:bg-yellow-600"
                  resetButtonClassName="bg-red-500 hover:bg-red-600"
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