import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "무선 이어폰",
    price: 159000,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    name: "스마트 워치",
    price: 299000,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    name: "노트북 스탠드",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop",
  },
  {
    id: 4,
    name: "기계식 키보드",
    price: 129000,
    image:
      "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=200&h=200&fit=crop",
  },
];

export default function App() {
  console.log("상품 데이터:", products);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">인기 상품</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => {
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-blue-600 font-bold">
                  {product.price.toLocaleString()}원
                </p>
                <button className="mt-3 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                  장바구니 담기
                </button>
              </div>
            </div>;
          })}
        </div>

        <p className="text-center text-gray-500 mt-8">
          총 {products.length}개의 상품
        </p>
      </div>
    </div>
  );
}
