import { useState } from 'react';
import useResizeCount from './hooks/useResizeCount';

export default function App() {
  const [rerenderCount, setRerenderCount] = useState(0);
  const resizeCount = useResizeCount();

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold">리사이즈 이벤트</h1>
        <p>리렌더: {rerenderCount}</p>
        <p>리사이즈 횟수: {resizeCount}</p>
        <button
          onClick={() => setRerenderCount((c) => c + 1)}
          className="px-4 py-2 rounded-md bg-emerald-500 text-white"
        >
          리렌더 추가
        </button>
      </div>
    </div>
  );
}
