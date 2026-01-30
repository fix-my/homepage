import { useState } from 'react';
import { useDebounce } from './hooks/useDebounce';
import SearchResults from './components/SearchResults';

const MOCK_DATA = [
  '리액트 hooks 사용법',
  '리액트 상태 관리',
  '리액트 성능 최적화',
  '자바스크립트 비동기 처리',
  '자바스크립트 클로저',
  '타입스크립트 제네릭',
  '타입스크립트 인터페이스',
  'CSS flexbox 레이아웃',
  'CSS grid 레이아웃',
  'Next.js 라우팅',
];

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const searchResults = MOCK_DATA.filter(item =>
    item.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">검색</h1>

      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="검색어를 입력하세요..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="mt-2 text-sm text-gray-600">
          입력값: <span className="font-mono">{searchTerm}</span>
        </p>
        <p className="text-sm text-gray-600">
          Debounced 값: <span className="font-mono">{debouncedSearchTerm}</span>
        </p>
      </div>

      <SearchResults results={searchResults} />
    </div>
  );
}
