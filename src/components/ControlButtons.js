// src/components/ControlButtons.js
import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const ControlButtons = ({ isRunning, handleStart, handlePause, handleReset, handleFocusLoss }) => {
  return (
    <>
      <div className="flex justify-center space-x-4 mb-6">
        {isRunning ? (
          <button onClick={handlePause} className="rounded-full bg-white bg-opacity-30 p-4 hover:bg-opacity-40 transition-all">
            <Pause className="w-8 h-8 text-gray-600" />
          </button>
        ) : (
          <button onClick={handleStart} className="rounded-full bg-white bg-opacity-30 p-4 hover:bg-opacity-40 transition-all">
            <Play className="w-8 h-8 text-gray-600" />
          </button>
        )}
        <button onClick={handleReset} className="rounded-full bg-white bg-opacity-30 p-4 hover:bg-opacity-40 transition-all">
          <RotateCcw className="w-8 h-8 text-gray-600" />
        </button>
      </div>

      {isRunning && (
        <button
          onClick={handleFocusLoss}
          className="w-full bg-red-200 bg-opacity-30 text-red-800 py-2 px-4 rounded-full hover:bg-opacity-40 transition-all"
        >
          이 단계 다시시도
        </button>
      )}
    </>
  );
};

export default ControlButtons;
