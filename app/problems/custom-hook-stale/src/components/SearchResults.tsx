interface SearchResultsProps {
  results: string[];
}

export default function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">검색 결과:</h3>
      {results.length === 0 ? (
        <p className="text-gray-500">검색 결과가 없습니다.</p>
      ) : (
        <ul className="space-y-2">
          {results.map((result, index) => (
            <li
              key={index}
              className="p-2 bg-gray-100 rounded hover:bg-gray-200"
            >
              {result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
