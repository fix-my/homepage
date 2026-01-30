interface SearchResultsProps {
  results: string[];
  loading: boolean;
}

export function SearchResults({ results, loading }: SearchResultsProps) {
  if (loading) {
    return <div className="loading">검색 중...</div>;
  }

  if (results.length === 0) {
    return <div className="no-results">검색 결과가 없습니다</div>;
  }

  return (
    <ul className="results-list">
      {results.map((result, index) => (
        <li key={index} className="result-item">
          {result}
        </li>
      ))}
    </ul>
  );
}
