import { useState } from 'react';
import useInterval from './hooks/useInterval';

export default function App() {
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);

  useInterval(
    () => {
      setCount((c) => c + 1);
    },
    1000,
    running
  );

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold">인터벌 카운터</h1>
        <p className="text-lg">카운트: {count}</p>
        <button
          onClick={() => setRunning((r) => !r)}
          className="px-4 py-2 rounded-md bg-indigo-500 text-white"
        >
          {running ? '정지' : '시작'}
        </button>
      </div>
    </div>
  );
}
