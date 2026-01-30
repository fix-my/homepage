'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ProblemMeta {
  title: string;
  situation: string;
  goals: string[];
}

interface ProblemViewerProps {
  meta: ProblemMeta;
  SrcApp: React.ComponentType;
  SolutionApp: React.ComponentType;
}

export default function ProblemViewer({ meta, SrcApp, SolutionApp }: ProblemViewerProps) {
  const [type, setType] = useState<'src' | 'solution'>('src');

  const App = type === 'src' ? SrcApp : SolutionApp;

  return (
    <div className="p-5 font-sans">
      <Link href="/" className="text-blue-500 hover:underline">
        ← Back to list
      </Link>

      <h1 className="text-2xl font-bold mt-5 mb-2">{meta.title}</h1>
      <p className="text-gray-600 mb-4">{meta.situation}</p>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Goals:</h3>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {meta.goals.map((goal, i) => (
            <li key={i}>{goal}</li>
          ))}
        </ul>
      </div>

      <div className="flex gap-3 mb-5">
        <button
          onClick={() => setType('src')}
          className={`px-5 py-2.5 rounded border-2 cursor-pointer font-medium transition-colors ${
            type === 'src'
              ? 'bg-red-50 border-red-500 font-bold'
              : 'bg-white border-red-500 hover:bg-red-50'
          }`}
        >
          src (버그 있음)
        </button>
        <button
          onClick={() => setType('solution')}
          className={`px-5 py-2.5 rounded border-2 cursor-pointer font-medium transition-colors ${
            type === 'solution'
              ? 'bg-green-50 border-green-500 font-bold'
              : 'bg-white border-green-500 hover:bg-green-50'
          }`}
        >
          solution (정답)
        </button>
      </div>

      <div className="border border-gray-300 p-5 mb-5 min-h-[300px] bg-white rounded">
        <App />
      </div>
    </div>
  );
}
