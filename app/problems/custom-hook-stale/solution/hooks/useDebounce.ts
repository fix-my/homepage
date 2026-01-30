import { useState, useEffect } from 'react';

export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // ✅ cleanup 함수 추가 - 이전 타이머를 정리
    return () => clearTimeout(timer);
  }, [value, delay]);  // ✅ delay 의존성 추가

  return debouncedValue;
}
