import { useState } from 'react';

export default function BuggyCounter() {
  const [count, setCount] = useState(0);

  if (count === 3) {
    throw new Error('크래시');
  }

  return (
    <div className="space-y-2">
      <p>현재 값: {count}</p>
      <button
        onClick={() => setCount((c) => c + 1)}
        className="px-3 py-2 rounded bg-blue-500 text-white"
      >
        증가
      </button>
    </div>
  );
}
