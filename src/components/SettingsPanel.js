// src/components/SettingsPanel.js
import React from 'react';
import { useSettings } from '../hooks/useSettings';

const SettingsPanel = () => {
  const { hourlyRate, setHourlyRate } = useSettings();

  return (
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
  );
};

export default SettingsPanel;
