// src/components/TimerDisplay.js
import React from 'react';
import { formatTime, calculateProgress } from '../utils/timerUtils';
import { STAGES } from '../constants';

const TimerDisplay = ({ time, currentStage, isRunning, earnedMoney }) => {
  return (
    <>
      <div className="text-6xl font-light text-gray-700 mb-4 text-center">
        {formatTime(time)}
      </div>
      <div className="text-sm text-gray-500 mb-4 text-center">
        {STAGES[currentStage]}분 단계 {(isRunning ? '진행 중' : '대기중')}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div 
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${calculateProgress(time, STAGES[currentStage])}%` }}
        ></div>
      </div>
      <div className="text-5xl font-light text-gray-700 mb-8 text-center">
        {earnedMoney.toFixed(0)}
        <span className="text-2xl ml-2">원</span>
      </div>
    </>
  );
};

export default TimerDisplay;
