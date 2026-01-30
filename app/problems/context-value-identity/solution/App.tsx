import { useCallback, useMemo, useState } from 'react';
import ThemeToggle from './components/ThemeToggle';
import { ThemeContext } from './context/ThemeContext';

export default function App() {
  const [count, setCount] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggle = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);

  return (
    <ThemeContext.Provider value={value}>
      <div className="min-h-screen bg-slate-50 p-8">
        <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 space-y-4">
          <h1 className="text-2xl font-bold">테마 컨텍스트</h1>
          <button
            onClick={() => setCount((c) => c + 1)}
            className="px-4 py-2 rounded-md bg-blue-500 text-white"
          >
            카운터: {count}
          </button>
          <ThemeToggle />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
