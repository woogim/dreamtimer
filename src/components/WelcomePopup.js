import React from 'react';
import { X, Clock, PiggyBank, DollarSign, History, RefreshCcw } from 'lucide-react';

const WelcomePopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">성공 타이머에 오신 것을 환영합니다!</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        <p className="mb-8 text-lg text-gray-600">성공을 향한 여정을 시작해보세요. 주요 기능을 소개합니다:</p>
        <ul className="space-y-8">
          <li className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <PiggyBank className="w-8 h-8 mr-3 text-blue-500" />
              <span className="font-semibold text-lg text-blue-700">꿈 저금통과 꿈 조각 설정</span>
            </div>
            <p className="text-gray-600 ml-11">
              큰 꿈을 작은 조각으로 나누어 관리하세요. 목표를 구체화하고 진행 상황을 추적할 수 있습니다.
            </p>
          </li>
          <li className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Clock className="w-8 h-8 mr-3 text-green-500" />
              <span className="font-semibold text-lg text-green-700">단계별 타이머</span>
            </div>
            <p className="text-gray-600 ml-11">
              집중력을 단계적으로 키워가세요. 1분, 5분, 10분, 15분, 30분 단계로 점진적으로 시간을 늘려갈 수 있습니다.
            </p>
          </li>
          <li className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <DollarSign className="w-8 h-8 mr-3 text-yellow-500" />
              <span className="font-semibold text-lg text-yellow-700">시급 설정을 통한 벌은 금액 계산</span>
            </div>
            <p className="text-gray-600 ml-11">
              당신의 시간 가치를 설정하세요. 집중한 시간만큼 쌓이는 가상의 금액으로 동기부여를 받을 수 있습니다.
            </p>
          </li>
          <li className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <History className="w-8 h-8 mr-3 text-purple-500" />
              <span className="font-semibold text-lg text-purple-700">히스토리 기록</span>
            </div>
            <p className="text-gray-600 ml-11">
              당신의 노력을 기록하고 확인하세요. 지속적인 성장과 발전을 한눈에 볼 수 있습니다.
            </p>
          </li>
          <li className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <RefreshCcw className="w-8 h-8 mr-3 text-red-500" />
              <span className="font-semibold text-lg text-red-700">집중력 잃었을 때 단계 재시작 기능</span>
            </div>
            <p className="text-gray-600 ml-11">
              실수해도 괜찮아요. 집중력을 잃었다면 언제든 현재 단계를 다시 시작할 수 있습니다.
            </p>
          </li>
        </ul>
        <button
          onClick={onClose}
          className="mt-10 w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 transition-colors text-lg font-semibold shadow-md hover:shadow-lg"
        >
          시작하기
        </button>
      </div>
    </div>
  );
};

export default WelcomePopup;