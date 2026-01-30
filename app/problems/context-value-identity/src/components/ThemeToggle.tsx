import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

export default function ThemeToggle() {
  console.log('ThemeToggle render');
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    return null;
  }

  return (
    <button
      onClick={ctx.toggle}
      className="px-4 py-2 rounded-md bg-gray-800 text-white"
    >
      테마: {ctx.theme === 'light' ? '라이트' : '다크'}
    </button>
  );
}
