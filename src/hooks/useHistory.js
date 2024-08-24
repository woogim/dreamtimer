// src/hooks/useHistory.js
import { useState, useEffect } from 'react';
export const useHistory = () => {
  const [history, setHistory] = useState(() => {
    const storedHistory = localStorage.getItem('dreamTimerHistory');
    return storedHistory ? JSON.parse(storedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem('dreamTimerHistory', JSON.stringify(history));
  }, [history]);

  const addHistoryRecord = (record) => {
    setHistory(prevHistory => {
      // 중복 체크: 같은 시간에 추가된 기록이 있는지 확인
      const isDuplicate = prevHistory.some(
        item => item.date === record.date && item.time === record.time
      );
      if (isDuplicate) {
        return prevHistory; // 중복이면 이전 상태 그대로 반환
      }
      return [...prevHistory, record]; // 중복이 아니면 새 기록 추가
    });
  };

  return { history, addHistoryRecord };
};