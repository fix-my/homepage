import { Suspense, useState } from "react";
import { createProfileResource } from "./cache";
import ProfileCard from "./ProfileCard";

export default function App() {
  const [count, setCount] = useState(0);
  const resource = createProfileResource();

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-xl mx-auto space-y-4">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="px-4 py-2 rounded-md bg-blue-500 text-white"
        >
          카운터: {count}
        </button>
        <Suspense fallback={<div className="text-gray-500">로딩...</div>}>
          <ProfileCard resource={resource} />
        </Suspense>
      </div>
    </div>
  );
}
