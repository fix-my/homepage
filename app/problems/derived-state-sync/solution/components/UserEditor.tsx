import { useEffect, useState } from 'react';

export type User = {
  id: number;
  name: string;
  role: string;
};

export default function UserEditor({ user }: { user: User }) {
  const [name, setName] = useState(user.name);

  useEffect(() => {
    setName(user.name);
  }, [user.id, user.name]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold" htmlFor="name-input">
        이름
      </label>
      <input
        id="name-input"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="w-full border rounded px-3 py-2"
      />
      <p className="text-sm text-gray-600">역할: {user.role}</p>
    </div>
  );
}
