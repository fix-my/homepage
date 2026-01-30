import React, { useState } from "react";

export default function App() {
  const [count, setCount] = useState(5);
  const [isRunning, setIsRunning] = useState(false);

  const startTimer = () => {
    setIsRunning(true);
    setCount(5);

    const timer = setInterval(() => {
      if (count <= 0) {
        clearInterval(timer);
        setIsRunning(false);
        return;
      }
      setCount(count - 1);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          카운트다운 타이머
        </h1>

        <div className="bg-gradient-to-r from-orange-100 to-red-100 rounded-xl p-8 mb-6">
          <p className="text-7xl font-bold text-orange-600">{count}</p>
          <p className="text-gray-500 mt-2">초</p>
        </div>

        <button
          onClick={startTimer}
          disabled={isRunning}
          className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition transform hover:scale-105 ${
            isRunning
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          {isRunning ? "카운트다운 중..." : "시작"}
        </button>

        <p className="text-gray-500 mt-4 text-sm">
          버튼을 누르면 5초 카운트다운이 시작됩니다
        </p>
      </div>
    </div>
  );
}
