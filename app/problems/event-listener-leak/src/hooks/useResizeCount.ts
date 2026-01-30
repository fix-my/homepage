import { useEffect, useState } from 'react';

export default function useResizeCount() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const handler = () => setCount((c) => c + 1);
    window.addEventListener('resize', handler);
  });

  return count;
}
