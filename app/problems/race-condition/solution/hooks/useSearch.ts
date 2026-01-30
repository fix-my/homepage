import { useState, useEffect } from 'react';
import fetch from '../api/fetch';

export function useSearch(query: string) {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }

    let ignore = false;
    setLoading(true);

    fetch(`/api/search?q=${query}`)
      .then(data => {
        if (!ignore) {
          setResults(data.results);
          setLoading(false);
        }
      });

    // cleanup: 이전 요청의 결과를 무시
    return () => {
      ignore = true;
    };
  }, [query]);

  return { results, loading };
}
