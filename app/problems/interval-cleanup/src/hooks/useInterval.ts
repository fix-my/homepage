import { useEffect } from 'react';

export default function useInterval(
  callback: () => void,
  delay: number,
  enabled: boolean
) {
  useEffect(() => {
    if (!enabled) {
      return;
    }
    const id = setInterval(callback, delay);
  }, [callback, delay, enabled]);
}
