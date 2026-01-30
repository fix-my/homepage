import React, { useState } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
}

const initialItems: CartItem[] = [
  { id: 1, name: "노트북", price: 1200000 },
  { id: 2, name: "마우스", price: 50000 },
  { id: 3, name: "키보드", price: 150000 },
];

export default function App() {
  const [items, setItems] = useState<CartItem[]>(initialItems);

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">장바구니</h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {items.length === 0 ? (
            <p className="p-8 text-center text-gray-500">
              장바구니가 비어있습니다
            </p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {items.map((item, index) => (
                <li
                  key={index}
                  className="p-4 flex items-center justify-between"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">
                      {item.price.toLocaleString()}원
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      defaultValue={1}
                      min={1}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center"
                      placeholder="수량"
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      삭제
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="mt-4 text-sm text-gray-500">
          총 {items.length}개 상품
        </div>
      </div>
    </div>
  );
}
