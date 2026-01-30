import React, { useState } from 'react';

interface Memo {
  id: number;
  text: string;
  createdAt: Date;
}

export default function App() {
  const [memos, setMemos] = useState<Memo[]>([
    { id: 1, text: '리액트 공부하기', createdAt: new Date() },
    { id: 2, text: '운동 30분', createdAt: new Date() },
  ]);
  const [input, setInput] = useState('');

  const addMemo = () => {
    if (!input.trim()) return;

    const newMemo: Memo = {
      id: Date.now(),
      text: input,
      createdAt: new Date(),
    };

    // 해결: 스프레드 연산자로 새 배열을 생성하여 불변성 유지
    setMemos([...memos, newMemo]);

    console.log('메모 추가됨');

    setInput('');
  };

  const deleteMemo = (id: number) => {
    setMemos(memos.filter(memo => memo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-orange-500 p-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            메모장
          </h1>

          {/* 입력 영역 */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addMemo()}
              placeholder="새 메모를 입력하세요..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
            <button
              onClick={addMemo}
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition"
            >
              추가
            </button>
          </div>

          {/* 메모 목록 */}
          <ul className="space-y-3">
            {memos.map((memo) => (
              <li
                key={memo.id}
                className="bg-yellow-50 rounded-lg p-4 flex items-center justify-between group"
              >
                <span className="text-gray-800">{memo.text}</span>
                <button
                  onClick={() => deleteMemo(memo.id)}
                  className="text-red-500 opacity-0 group-hover:opacity-100 transition"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>

          {memos.length === 0 && (
            <p className="text-center text-gray-500 py-8">메모가 없습니다</p>
          )}

          <p className="text-center text-gray-400 mt-4 text-sm">
            총 {memos.length}개의 메모
          </p>
        </div>
      </div>
    </div>
  );
}
