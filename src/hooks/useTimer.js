// src/hooks/useTimer.js
import { useState, useEffect } from 'react';
import { STAGES } from '../constants';
import { useSettings } from './useSettings';
import { useHistory } from './useHistory';

export const useTimer = (currentDreamBank, currentDreamPiece) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(STAGES[0] * 60);
  const [earnedMoney, setEarnedMoney] = useState(0);
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false);

  const { hourlyRate } = useSettings();
  const { addHistoryRecord } = useHistory();

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setIsRunning(false);
            handleStageComplete();
            return 0;
          }
          return prevTime - 1;
        });
        setEarnedMoney((prevEarned) => prevEarned + hourlyRate / 3600);
      }, 1);
    }
    return () => clearInterval(interval);
  }, [isRunning, hourlyRate]);

  const handleStageComplete = () => {
    if (currentStage < STAGES.length - 1) {
      setCurrentStage((prevStage) => prevStage + 1);
      setTime(STAGES[currentStage + 1] * 60);
    } else {
      const now = new Date();
      const totalDuration = STAGES.reduce((a, b) => a + b, 0);
      const finalEarnedMoney = hourlyRate * (totalDuration / 60);
      addHistoryRecord({
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        duration: totalDuration,
        earned: finalEarnedMoney.toFixed(0),
        dreamBank: currentDreamBank,
        dreamPiece: currentDreamPiece
      });
      if (totalDuration >= 60) {
        setShowCompletionAnimation(true);
        setTimeout(() => setShowCompletionAnimation(false), 3000);
      }
      handleReset();
    }
  };


  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setCurrentStage(0);
    setTime(STAGES[0] * 60);
    setEarnedMoney(0);
  };

  const handleFocusLoss = () => {
    setIsRunning(false);
    setEarnedMoney((prevEarned) => prevEarned - ((hourlyRate / 3600) * ((STAGES[currentStage] * 60) - time)));
    setTime(STAGES[currentStage] * 60);
  };

  return {
    time,
    isRunning,
    earnedMoney,
    currentStage,
    handleStart,
    handlePause,
    handleReset,
    handleFocusLoss,
    showCompletionAnimation,
  };
};