import React from 'react';
import { useHistory } from '../hooks/useHistory';
import { Calendar, Clock, PiggyBank, Puzzle, DollarSign } from 'lucide-react';

const HistoryTable = () => {
  const { history } = useHistory();

  const formatDate = (date, time) => {
    return `${date} ${time}`;
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('ko-KR').format(amount);
  };

  return (
    <div className="bg-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-3xl p-6 shadow-lg w-full max-w-4xl mx-auto mb-8 overflow-auto">
      <h2 className="text-2xl font-semibold mb-6 text-indigo-700">성공 기록</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {history.map((record, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4 transition-all hover:shadow-lg">
            <div className="flex items-center mb-2 text-indigo-600">
              <Calendar className="w-5 h-5 mr-2" />
              <span className="text-sm">{formatDate(record.date, record.time)}</span>
            </div>
            <div className="flex items-center mb-2 text-green-600">
              <PiggyBank className="w-5 h-5 mr-2" />
              <span className="font-medium">{record.dreamBank}</span>
            </div>
            <div className="flex items-center mb-2 text-blue-600">
              <Puzzle className="w-5 h-5 mr-2" />
              <span>{record.dreamPiece}</span>
            </div>
            <div className="flex items-center mb-2 text-yellow-600">
              <Clock className="w-5 h-5 mr-2" />
              <span>{record.duration} 분</span>
            </div>
            <div className="flex items-center text-purple-600">
              <DollarSign className="w-5 h-5 mr-2" />
              <span className="font-bold">{formatAmount(record.earned)} 원</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryTable;