import { useState, useEffect, useRef } from 'react';
import { STAGES } from '../constants';
import { useSettings } from './useSettings';
import { useHistory } from './useHistory';

export const useTimer = (currentDreamBank, currentDreamPiece) => {
  const [currentStage, setCurrentStage] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(STAGES[0] * 60);
  const [earnedMoney, setEarnedMoney] = useState(0);
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false);
  const [progress, setProgress] = useState(0);

  const { hourlyRate } = useSettings();
  const { addHistoryRecord } = useHistory();

  const startTimeRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastUpdateTimeRef = useRef(null);

  const updateTimer = () => {
    if (!startTimeRef.current) return;

    const currentTime = Date.now();
    const elapsedSeconds = Math.floor((currentTime - startTimeRef.current) / 1000);
    const remainingTime = Math.max(STAGES[currentStage] * 60 - elapsedSeconds, 0);

    setTime(remainingTime);
    setProgress(((STAGES[currentStage] * 60 - remainingTime) / (STAGES[currentStage] * 60)) * 100);
    console.log('Progress updated:', ((STAGES[currentStage] * 60 - remainingTime) / (STAGES[currentStage] * 60)) * 100);

    const timeSinceLastUpdate = (currentTime - (lastUpdateTimeRef.current || currentTime)) / 1000;
    lastUpdateTimeRef.current = currentTime;

    setEarnedMoney((prevEarned) => prevEarned + (hourlyRate / 3600) * timeSinceLastUpdate);

    if (remainingTime > 0) {
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    } else {
      handleStageComplete();
    }
  };

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - ((STAGES[currentStage] * 60) - time) * 1000;
      lastUpdateTimeRef.current = Date.now();
      animationFrameRef.current = requestAnimationFrame(updateTimer);
    } else {
      cancelAnimationFrame(animationFrameRef.current);
    }

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isRunning, currentStage]);

  const handleStageComplete = () => {
    if (currentStage < STAGES.length - 1) {
      setCurrentStage((prevStage) => prevStage + 1);
      setTime(STAGES[currentStage + 1] * 60);
      setProgress(0);
      startTimeRef.current = Date.now();
      lastUpdateTimeRef.current = Date.now();
    } else {
      const now = new Date();
      const totalDuration = STAGES.reduce((a, b) => a + b, 0);
      addHistoryRecord({
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        duration: totalDuration,
        earned: earnedMoney.toFixed(0),
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

  const handleStart = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - ((STAGES[currentStage] * 60) - time) * 1000;
    lastUpdateTimeRef.current = Date.now();
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setCurrentStage(0);
    setTime(STAGES[0] * 60);
    setEarnedMoney(0);
    setProgress(0);
    startTimeRef.current = null;
    lastUpdateTimeRef.current = null;
  };

  const handleFocusLoss = () => {
    setIsRunning(false);
    setTime(STAGES[currentStage] * 60);
    setProgress(0);
    startTimeRef.current = null;
    lastUpdateTimeRef.current = null;
  };

  return {
    time,
    isRunning,
    earnedMoney,
    currentStage,
    progress,
    handleStart,
    handlePause,
    handleReset,
    handleFocusLoss,
    showCompletionAnimation,
  };
};