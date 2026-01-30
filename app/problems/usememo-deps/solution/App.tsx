import { useMemo, useState } from 'react';

type Item = { id: number; price: number };

export default function App() {
  const [items, setItems] = useState<Item[]>([]);

  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold">장바구니 합계</h1>
        <p>합계: {total}</p>
        <button
          onClick={() =>
            setItems((prev) => [
              ...prev,
              { id: prev.length + 1, price: 10 },
            ])
          }
          className="px-4 py-2 rounded-md bg-blue-500 text-white"
        >
          아이템 추가
        </button>
      </div>
    </div>
  );
}
