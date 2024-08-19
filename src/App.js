import React, { useState, useEffect } from 'react';
import { ChevronLeft, X, Play, Pause, RotateCcw, AlertCircle, Settings, Menu, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DreamTimer = () => {
  const STAGES = [1, 5, 10, 15, 30];
  const [currentStage, setCurrentStage] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(STAGES[0] * 60);
  const [earnedMoney, setEarnedMoney] = useState(0);
  const [hourlyRate, setHourlyRate] = useState(() => {
    const storedRate = localStorage.getItem('dreamTimerHourlyRate');
    return storedRate ? Number(storedRate) : 1000000;
  });
  const [showSettings, setShowSettings] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [history, setHistory] = useState(() => {
    const storedHistory = localStorage.getItem('dreamTimerHistory');
    return storedHistory ? JSON.parse(storedHistory) : [];
  });
  const [currentDreamBank, setCurrentDreamBank] = useState('');
  const [currentDreamPiece, setCurrentDreamPiece] = useState('');
  const [dreamBanks, setDreamBanks] = useState(() => {
    const storedDreamBanks = localStorage.getItem('dreamTimerDreamBanks');
    return storedDreamBanks ? JSON.parse(storedDreamBanks) : [];
  });
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false);
  const [showDreamBankPopup, setShowDreamBankPopup] = useState(false);

  useEffect(() => {
    localStorage.setItem('dreamTimerHourlyRate', hourlyRate.toString());
  }, [hourlyRate]);

  useEffect(() => {
    localStorage.setItem('dreamTimerHistory', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('dreamTimerDreamBanks', JSON.stringify(dreamBanks));
  }, [dreamBanks]);

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
  }, [isRunning, hourlyRate, currentStage]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStageComplete = () => {
    if (currentStage < STAGES.length) {
      setCurrentStage((prevStage) => prevStage + 1);
      setTime(STAGES[currentStage + 1] * 60);
    } else {
      const now = new Date();
      const totalDuration = STAGES.reduce((a, b) => a + b, 0);
      setHistory(prevHistory => [
        ...prevHistory,
        {
          date: now.toLocaleDateString(),
          time: now.toLocaleTimeString(),
          duration: totalDuration,
          earned: earnedMoney.toFixed(0),
          dreamBank: currentDreamBank,
          dreamPiece: currentDreamPiece
        }
      ]);
      if (totalDuration >= 60) {
        setShowCompletionAnimation(true);
        setTimeout(() => setShowCompletionAnimation(false), 3000);
      }
      handleReset();
    }
  };

  const handleStart = () => {
    if (currentDreamBank && currentDreamPiece) {
      setIsRunning(true);
    } else {
      alert('꿈 저금통과 꿈 조각을 선택해주세요.');
    }
  };
  
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setCurrentStage(0);
    setTime(STAGES[0] * 60);
    setEarnedMoney(0);
    setCurrentDreamBank('');
    setCurrentDreamPiece('');
  };

  const handleFocusLoss = () => {
    setIsRunning(false);
    setEarnedMoney((prevEarned) => prevEarned - ((hourlyRate / 3600) * ((STAGES[currentStage] * 60) - time)));
    setTime(STAGES[currentStage] * 60);
  };

  const calculateProgress = () => {
    const totalTime = STAGES[currentStage] * 60;
    const elapsedTime = totalTime - time;
    return (elapsedTime / totalTime) * 100;
  };

  const handleAddDreamBank = () => {
    if (currentDreamBank && !dreamBanks.some(db => db.name === currentDreamBank)) {
      setDreamBanks([...dreamBanks, { name: currentDreamBank, pieces: [] }]);
    }
  };

  const handleAddDreamPiece = () => {
    if (currentDreamPiece && currentDreamBank) {
      setDreamBanks(dreamBanks.map(db => 
        db.name === currentDreamBank
          ? { ...db, pieces: [...db.pieces, currentDreamPiece] }
          : db
      ));
    }
  };

  const handleDreamBankSelect = (dreamBank) => {
    setCurrentDreamBank(dreamBank.name);
    setCurrentDreamPiece('');
    setShowDreamBankPopup(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-100 to-white p-4">
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
        <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-3xl p-6 shadow-lg w-full max-w-md mx-auto mb-8 overflow-auto">
          <h2 className="text-xl font-semibold mb-4">성공 기록</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">날짜</th>
                <th className="text-left">시각</th>
                <th className="text-left">꿈 저금통</th>
                <th className="text-left">꿈 조각</th>
                <th className="text-left">성공 시간 (분)</th>
                <th className="text-left">벌은 금액 (원)</th>
              </tr>
            </thead>
            <tbody>
              {history.map((record, index) => (
                <tr key={index}>
                  <td>{record.date}</td>
                  <td>{record.time}</td>
                  <td>{record.dreamBank}</td>
                  <td>{record.dreamPiece}</td>
                  <td>{record.duration}</td>
                  <td>{record.earned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl p-8 shadow-lg w-full max-w-md">
            {showSettings ? (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  시급 설정 (원/시간)
                </label>
                <input
                  type="number"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full p-2 border rounded-md"
                />
              </div>
            ) : (
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

                <div className="text-6xl font-light text-gray-700 mb-4 text-center">
                  {formatTime(time)}
                </div>
                <div className="text-sm text-gray-500 mb-4 text-center">
                  {STAGES[currentStage]}분 단계 {(isRunning ? '진행 중' : '대기중')}
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${calculateProgress()}%` }}
                  ></div>
                </div>

                <div className="text-5xl font-light text-gray-700 mb-8 text-center">
                  {earnedMoney.toFixed(0)}
                  <span className="text-2xl ml-2">원</span>
                </div>

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
            )}
          </div>

          <div className="flex justify-between w-full max-w-md mt-8">
            {STAGES.map((stage, index) => (
              <div key={stage} className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full mb-2 ${index <= currentStage ? 'bg-blue-400' : 'bg-gray-300'}`} />
                <span className="text-sm text-gray-500">{stage}분</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {showCompletionAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div className="bg-white rounded-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">축하합니다!</h2>
              <p>1시간 꿈 저금을 완료하셨습니다!</p>
            </div>
          </motion.div>
        )}

        {showDreamBankPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div className="bg-white rounded-lg p-8 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">꿈 저금통 선택</h2>
              <div className="max-h-60 overflow-y-auto">
                {dreamBanks.map((dreamBank, index) => (
                  <button
                    key={index}
                    onClick={() => handleDreamBankSelect(dreamBank)}
                    className="w-full text-left py-2 px-4 hover:bg-blue-100 rounded-md transition-all"
                  >
                    {dreamBank.name}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowDreamBankPopup(false)}
                className="mt-4 w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-all"
              >
                닫기
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DreamTimer;