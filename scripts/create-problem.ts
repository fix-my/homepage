#!/usr/bin/env tsx

/**
 * Interactive CLI for creating new problems
 *
 * Usage:
 *   pnpm create-problem
 *
 * Generates:
 * - page.tsx for Next.js App Router
 * - problem.json with metadata
 * - src/ folder with buggy template code
 * - solution/ folder with correct template code
 * - test.tsx with test template
 */

import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join } from 'path';
import * as readline from 'readline';

interface ProblemConfig {
  id: string;
  title: string;
  situation: string;
  goals: string[];
  author: string;
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(prompt: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer.trim());
    });
  });
}

async function promptConfig(): Promise<ProblemConfig> {
  console.log('\n📝 Create New Problem\n');

  // Problem ID
  const id = await question('Problem ID (kebab-case): ');
  if (!id || !/^[a-z0-9-]+$/.test(id)) {
    throw new Error('Invalid problem ID. Use kebab-case (e.g., counter-bug)');
  }

  // Title
  const title = await question('Title (Korean): ');
  if (!title) {
    throw new Error('Title is required');
  }

  // Situation
  console.log('\nSituation (Korean, press Enter twice when done):');
  const situationLines: string[] = [];
  while (true) {
    const line = await question('');
    if (line === '' && situationLines.length > 0) break;
    if (line !== '') situationLines.push(line);
  }
  const situation = situationLines.join(' ');

  // Goals
  console.log('\nGoals (Korean, comma-separated):');
  const goalsInput = await question('');
  const goals = goalsInput.split(',').map((g) => g.trim()).filter(Boolean);
  if (goals.length === 0) {
    throw new Error('At least one goal is required');
  }

  // Author
  const defaultAuthor = process.env.GITHUB_USERNAME || 'SeoJaeWan';
  const author = await question(`Author GitHub username (default: ${defaultAuthor}): `) || defaultAuthor;

  return {
    id,
    title,
    situation,
    goals,
    author,
  };
}

function generateProblemJson(config: ProblemConfig): string {
  return JSON.stringify(
    {
      title: config.title,
      situation: config.situation,
      goals: config.goals,
      environment: {
        type: 'react',
        dependencies: {
          react: '^18.0.0',
          'react-dom': '^18.0.0',
        },
      },
      author: {
        github: config.author,
      },
    },
    null,
    2
  );
}

function generatePageTsx(problemId: string): string {
  return `import ProblemViewer from '@/app/components/ProblemViewer';

export default function ${problemId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}Page() {
  return <ProblemViewer problemId="${problemId}" />;
}
`;
}

function generateReactTemplate(isSolution: boolean): {
  'App.tsx': string;
} {
  const appTsx = `import { useState } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    ${isSolution ? '// TODO: Add your solution logic here' : '// BUG: Add a bug here'}
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Problem Template</h1>
      <p className="text-lg mb-4">Count: {count}</p>
      <button
        onClick={handleClick}
        className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Click me
      </button>
    </div>
  );
};

export default App;
`;

  return {
    'App.tsx': appTsx,
  };
}

function generateTestTemplate(problemId: string): string {
  return `import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './src/App';

describe('${problemId}', () => {
  it('should solve the problem', async () => {
    render(<App />);

    // TODO: Write your test logic here
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();

    // Example: Click button and check result
    await act(async () => {
      button.click();
    });

    const count = screen.getByText(/count:/i);
    expect(count).toHaveTextContent('Count: 1');
  });
});
`;
}

function createProblemFiles(config: ProblemConfig, basePath: string): void {
  const problemPath = join(basePath, config.id);

  // Check if problem already exists
  if (existsSync(problemPath)) {
    throw new Error(`Problem already exists: ${problemPath}`);
  }

  console.log(`\n📁 Creating problem at: ${problemPath}\n`);

  // Create directories
  mkdirSync(problemPath, { recursive: true });
  mkdirSync(join(problemPath, 'src'), { recursive: true });
  mkdirSync(join(problemPath, 'solution'), { recursive: true });

  // Generate page.tsx (Next.js App Router)
  const pageTsx = generatePageTsx(config.id);
  writeFileSync(join(problemPath, 'page.tsx'), pageTsx);
  console.log('✅ Created page.tsx');

  // Generate problem.json
  const problemJson = generateProblemJson(config);
  writeFileSync(join(problemPath, 'problem.json'), problemJson);
  console.log('✅ Created problem.json');

  // Generate src/ files (with bugs)
  const srcFiles = generateReactTemplate(false);
  for (const [filename, content] of Object.entries(srcFiles)) {
    writeFileSync(join(problemPath, 'src', filename), content);
  }
  console.log('✅ Created src/ folder with template files');

  // Generate solution/ files (without bugs)
  const solutionFiles = generateReactTemplate(true);
  for (const [filename, content] of Object.entries(solutionFiles)) {
    writeFileSync(join(problemPath, 'solution', filename), content);
  }
  console.log('✅ Created solution/ folder with template files');

  // Generate test.tsx
  const testContent = generateTestTemplate(config.id);
  writeFileSync(join(problemPath, 'test.tsx'), testContent);
  console.log('✅ Created test.tsx');

  console.log(`\n✨ Problem created successfully!\n`);
  console.log(`Next steps:`);
  console.log(`1. Edit src/App.tsx to add bugs`);
  console.log(`2. Edit solution/App.tsx with correct implementation`);
  console.log(`3. Write tests in test.tsx`);
  console.log(`4. Run: pnpm generate-index`);
  console.log(`5. Run: pnpm test ${config.id}\n`);
}

async function main() {
  try {
    const config = await promptConfig();

    const problemsDir = join(process.cwd(), 'app', 'problems');
    if (!existsSync(problemsDir)) {
      throw new Error('app/problems/ directory not found. Run this script from project root.');
    }

    createProblemFiles(config, problemsDir);
  } catch (error: any) {
    console.error(`\n❌ Error: ${error.message}\n`);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();
