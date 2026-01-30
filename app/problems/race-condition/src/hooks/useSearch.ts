import { useState, useEffect } from "react";
import fetch from "../api/fetch";

export function useSearch(query: string) {
  const [results, setResults] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    setLoading(true);

    fetch(`/api/search?q=${query}`)
      .then((data) => {
        setResults(data.results);
        setLoading(false);
      });
  }, [query]);

  return { results, loading };
}
