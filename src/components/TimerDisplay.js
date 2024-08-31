import React from 'react';
import { formatTime } from '../utils/timerUtils';
import { STAGES } from '../constants';

const TimerDisplay = ({ time, currentStage, isRunning, earnedMoney, progress }) => {
  // 예쁜 디자인을 위한 단계적 접근:
  // 1. 색상 팔레트 개선: 부드러운 그라데이션과 조화로운 색상 사용
  // 2. 타이포그래피 강화: 가독성과 시각적 계층 구조 개선
  // 3. 레이아웃 최적화: 요소 간 간격과 정렬 조정
  // 4. 시각적 요소 추가: 아이콘 및 애니메이션 효과 도입
  // 5. 반응형 디자인: 다양한 화면 크기에 대응

  return (
    <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-8 rounded-2xl shadow-lg">
      <div className="text-7xl font-bold text-indigo-600 mb-6 text-center tracking-tight">
        {formatTime(time)}
      </div>
      <div className="text-lg text-purple-600 mb-6 text-center font-medium">
        {STAGES[currentStage]}분 단계 
        <span className={`ml-2 inline-block px-3 py-1 rounded-full ${isRunning ? 'bg-green-400 text-white' : 'bg-gray-300 text-gray-700'}`}>
          {isRunning ? '진행 중' : '대기중'}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 mb-6 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="text-6xl font-bold text-indigo-700 mb-2 text-center">
        {Math.floor(earnedMoney).toLocaleString()}
        <span className="text-3xl ml-2 text-purple-600">원</span>
      </div>
      <div className="text-sm text-center text-purple-500">
        지금까지 모은 금액
      </div>
    </div>
  );
};

export default TimerDisplay;