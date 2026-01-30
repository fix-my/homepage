import { useState } from 'react';
import { useSearch } from './hooks/useSearch';
import { SearchResults } from './components/SearchResults';

function App() {
  const [query, setQuery] = useState('');
  const { results, loading } = useSearch(query);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>검색</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="검색어를 입력하세요 (예: react, vue, angular)"
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>
      <SearchResults results={results} loading={loading} />
    </div>
  );
}

export default App;
