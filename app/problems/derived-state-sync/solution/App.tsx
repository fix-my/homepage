import { useState } from 'react';
import UserEditor, { User } from './components/UserEditor';

const users: User[] = [
  { id: 1, name: 'Alice', role: '디자이너' },
  { id: 2, name: 'Bob', role: '개발자' },
  { id: 3, name: 'Carol', role: '기획자' },
];

export default function App() {
  const [selectedId, setSelectedId] = useState(1);
  const selectedUser = users.find((user) => user.id === selectedId) ?? users[0];

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold">사용자 편집</h1>
        <div className="flex gap-2">
          {users.map((user) => (
            <button
              key={user.id}
              onClick={() => setSelectedId(user.id)}
              className={`px-3 py-2 rounded ${
                selectedId === user.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100'
              }`}
            >
              {user.name}
            </button>
          ))}
        </div>
        <UserEditor user={selectedUser} />
      </div>
    </div>
  );
}
