import Link from 'next/link';
import fs from 'fs';
import path from 'path';

interface ProblemMeta {
  folderName: string;
  title: string;
  situation: string;
}

async function getProblems(): Promise<ProblemMeta[]> {
  const problemsDir = path.join(process.cwd(), 'app/problems');
  const folders = fs.readdirSync(problemsDir).filter((name) => {
    const fullPath = path.join(problemsDir, name);
    return fs.statSync(fullPath).isDirectory() && !name.startsWith('_');
  });

  const problems: ProblemMeta[] = [];

  for (const folder of folders) {
    const jsonPath = path.join(problemsDir, folder, 'problem.json');
    if (fs.existsSync(jsonPath)) {
      const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
      problems.push({
        folderName: folder,
        title: data.title,
        situation: data.situation,
      });
    }
  }

  return problems.sort((a, b) => a.folderName.localeCompare(b.folderName));
}

export default async function HomePage() {
  const problems = await getProblems();

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-2">Fix My Homepage - Problems</h1>
      <p className="text-gray-600 mb-8">
        문제를 선택하여 로컬에서 테스트하세요 ({problems.length}개 문제)
      </p>

      <div className="flex flex-col gap-3">
        {problems.map((problem) => (
          <Link
            key={problem.folderName}
            href={`/problems/${problem.folderName}`}
            className="block p-5 bg-white border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg font-semibold text-blue-600">
                {problem.title}
              </span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {problem.folderName}
              </span>
            </div>
            <p className="text-gray-600 text-sm line-clamp-2">
              {problem.situation}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
