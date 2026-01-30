import { useState } from 'react';

type Post = { id: number; title: string; liked: boolean };

const initialPosts: Post[] = [
  { id: 1, title: '포스트 A', liked: false },
  { id: 2, title: '포스트 B', liked: false },
  { id: 3, title: '포스트 C', liked: false },
];

function saveLike(id: number, liked: boolean) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (id === 2) {
        reject(new Error('저장 실패'));
        return;
      }
      resolve();
    }, 80);
  });
}

export default function App() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [error, setError] = useState('');

  const toggleLike = async (id: number) => {
    setError('');
    const prevPosts = posts;
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, liked: !post.liked } : post
      )
    );

    try {
      const nextLiked = !prevPosts.find((post) => post.id === id)?.liked;
      await saveLike(id, Boolean(nextLiked));
    } catch (err) {
      setError('저장 실패');
      setPosts(prevPosts);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-6 space-y-4">
        <h1 className="text-2xl font-bold">좋아요 토글</h1>
        {error && <p className="text-red-500">{error}</p>}
        <ul className="space-y-3">
          {posts.map((post) => (
            <li key={post.id} className="flex items-center justify-between">
              <span>{post.title}</span>
              <button
                onClick={() => toggleLike(post.id)}
                className={`px-3 py-1 rounded ${
                  post.liked ? 'bg-pink-500 text-white' : 'bg-gray-200'
                }`}
              >
                {post.liked ? '좋아요 취소' : '좋아요'}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
