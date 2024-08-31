import React, { useState, useMemo } from 'react';
import { useHistory } from '../hooks/useHistory';
import { Calendar, Clock, PiggyBank, Puzzle, DollarSign, BarChart2, ChevronDown, ChevronUp } from 'lucide-react';

const HistoryTable = () => {
  const { history } = useHistory();
  const [viewMode, setViewMode] = useState('list');
  const [expandedBanks, setExpandedBanks] = useState({});

  const formatDate = (date, time) => {
    return `${date} ${time}`;
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('ko-KR').format(amount);
  };

  const groupedData = useMemo(() => {
    return history.reduce((acc, record) => {
      if (!acc[record.dreamBank]) {
        acc[record.dreamBank] = { totalAmount: 0, totalDuration: 0, pieces: {} };
      }
      if (!acc[record.dreamBank].pieces[record.dreamPiece]) {
        acc[record.dreamBank].pieces[record.dreamPiece] = { amount: 0, duration: 0, records: [] };
      }
      acc[record.dreamBank].totalAmount += Number(record.earned);
      acc[record.dreamBank].totalDuration += Number(record.duration);
      acc[record.dreamBank].pieces[record.dreamPiece].amount += Number(record.earned);
      acc[record.dreamBank].pieces[record.dreamPiece].duration += Number(record.duration);
      acc[record.dreamBank].pieces[record.dreamPiece].records.push(record);
      return acc;
    }, {});
  }, [history]);

  const toggleExpand = (bankName) => {
    setExpandedBanks(prev => ({ ...prev, [bankName]: !prev[bankName] }));
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-6 shadow-lg w-full max-w-4xl mx-auto mb-8 overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-indigo-800">성공 기록</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 rounded-md ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            목록
          </button>
          <button
            onClick={() => setViewMode('summary')}
            className={`px-3 py-1 rounded-md ${viewMode === 'summary' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            요약
          </button>
        </div>
      </div>

      {viewMode === 'list' ? (
        <div className="space-y-4">
          {history.map((record, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 transition-all hover:shadow-xl hover:scale-105 transform duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-indigo-700">
                  <Calendar className="w-6 h-6 mr-2" />
                  <span className="text-lg font-medium">{formatDate(record.date, record.time)}</span>
                </div>
                <div className="flex items-center text-purple-700">
                  <DollarSign className="w-6 h-6 mr-2" />
                  <span className="text-xl font-bold">{formatAmount(record.earned)} 원</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center bg-green-50 p-3 rounded-lg">
                  <PiggyBank className="w-8 h-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium text-green-800">{record.dreamBank}</span>
                </div>
                <div className="flex flex-col items-center bg-blue-50 p-3 rounded-lg">
                  <Puzzle className="w-8 h-8 text-blue-600 mb-2" />
                  <span className="text-sm font-medium text-blue-800">{record.dreamPiece}</span>
                </div>
                <div className="flex flex-col items-center bg-yellow-50 p-3 rounded-lg">
                  <Clock className="w-8 h-8 text-yellow-600 mb-2" />
                  <span className="text-sm font-medium text-yellow-800">{record.duration} 분</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedData).map(([dreamBank, data], index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-indigo-700">
                  <PiggyBank className="w-8 h-8 mr-2" />
                  <span className="text-xl font-bold">{dreamBank}</span>
                </div>
                <div className="flex items-center">
                  <div className="flex items-center text-purple-700 mr-4">
                    <DollarSign className="w-6 h-6 mr-2" />
                    <span className="text-xl font-bold">{formatAmount(data.totalAmount)} 원</span>
                  </div>
                  <button
                    onClick={() => toggleExpand(dreamBank)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {expandedBanks[dreamBank] ? <ChevronUp /> : <ChevronDown />}
                  </button>
                </div>
              </div>
              <div className="flex items-center text-yellow-600 mb-2">
                <Clock className="w-6 h-6 mr-2" />
                <span className="text-lg">{data.totalDuration} 분</span>
              </div>
              <div className="text-gray-600">
                <BarChart2 className="w-6 h-6 inline mr-2" />
                <span>{Object.keys(data.pieces).length}개의 꿈 조각</span>
              </div>
              {expandedBanks[dreamBank] && (
                <div className="mt-4 space-y-4">
                  {Object.entries(data.pieces).map(([piece, pieceData], pieceIndex) => (
                    <div key={pieceIndex} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center text-blue-600">
                          <Puzzle className="w-6 h-6 mr-2" />
                          <span className="font-medium">{piece}</span>
                        </div>
                        <div className="text-purple-600 font-bold">
                          {formatAmount(pieceData.amount)} 원
                        </div>
                      </div>
                      <div className="text-yellow-600">
                        <Clock className="w-4 h-4 inline mr-1" />
                        <span>{pieceData.duration} 분</span>
                      </div>
                      <div className="text-gray-500 text-sm">
                        {pieceData.records.length}개의 기록
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryTable;