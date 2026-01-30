'use client';

import ProblemViewer from '@/app/components/ProblemViewer';
import SrcApp from './src/App';
import SolutionApp from './solution/App';
import problemData from './problem.json';

export default function Page() {
  return (
    <ProblemViewer
      meta={problemData}
      SrcApp={SrcApp}
      SolutionApp={SolutionApp}
    />
  );
}
