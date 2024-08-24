// src/hooks/useSettings.js
import { useState, useEffect } from 'react';

export const useSettings = () => {
  const [hourlyRate, setHourlyRate] = useState(() => {
    const storedRate = localStorage.getItem('dreamTimerHourlyRate');
    return storedRate ? Number(storedRate) : 1000000;
  });

  useEffect(() => {
    localStorage.setItem('dreamTimerHourlyRate', hourlyRate.toString());
  }, [hourlyRate]);

  return { hourlyRate, setHourlyRate };
};

