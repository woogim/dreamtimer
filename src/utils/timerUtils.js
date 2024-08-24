// src/utils/timerUtils.js
export const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  export const calculateProgress = (currentTime, totalTime) => {
    return ((totalTime - currentTime) / totalTime) * 100;
  };
  