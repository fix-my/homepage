#!/usr/bin/env tsx

/**
 * problems/index.json 자동 생성 스크립트
 *
 * 모든 문제 폴더를 스캔하여 메타데이터를 수집하고
 * problems/index.json 파일을 생성합니다.
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join } from 'path';

interface ProblemJsonData {
  title: string;
  situation: string;
  goals: string[];
  environment: {
    type: string;
    dependencies?: Record<string, string>;
  };
  author: {
    github: string;
  };
}

interface ProblemMetadata extends ProblemJsonData {
  id: string; // slug id (폴더명을 그대로 사용)
  folderName: string; // 폴더 이름 (GitHub에서 파일 로드용)
  category?: string; // 자동으로 추출됨
}

interface ProblemIndex {
  version: string;
  lastUpdated: string;
  problems: ProblemMetadata[];
}

function loadProblemMetadata(problemPath: string, id: string, folderName: string, category: string): ProblemMetadata | null {
  const jsonPath = join(problemPath, 'problem.json');

  if (!existsSync(jsonPath)) {
    console.warn(`⚠️  Skipping ${problemPath}: no problem.json`);
    return null;
  }

  try {
    const content = readFileSync(jsonPath, 'utf-8');
    const jsonData = JSON.parse(content) as ProblemJsonData;
    // id, folderName, 카테고리를 자동으로 추가
    const data: ProblemMetadata = {
      id,
      folderName,
      ...jsonData,
      category,
    };
    return data;
  } catch (err) {
    console.error(`❌ Failed to parse ${jsonPath}:`, err);
    return null;
  }
}

function findAllProblems(baseDir: string): ProblemMetadata[] {
  const problems: ProblemMetadata[] = [];

  // flat 구조: problems/problem-folder/problem.json
  const problemDirs = readdirSync(baseDir)
    .filter((name) => {
      const path = join(baseDir, name);
      return statSync(path).isDirectory() && !name.startsWith('_');
    })
    .sort(); // 알파벳 순 정렬

  // 폴더명을 그대로 id로 사용 (slug 기반)
  for (const problemDir of problemDirs) {
    const problemPath = join(baseDir, problemDir);
    const metadata = loadProblemMetadata(problemPath, problemDir, problemDir, 'react'); // 기본 카테고리

    if (metadata) {
      problems.push(metadata);
    }
  }

  return problems;
}

function generateIndex(problems: ProblemMetadata[]): ProblemIndex {
  return {
    version: '1.0',
    lastUpdated: new Date().toISOString(),
    problems: problems.sort((a, b) => a.id.localeCompare(b.id)), // slug 알파벳 순으로 정렬
  };
}

// 메인 실행
function main() {
  const problemsDir = join(process.cwd(), 'app', 'problems');

  if (!existsSync(problemsDir)) {
    console.error('❌ app/problems/ directory not found');
    process.exit(1);
  }

  console.log('🔍 Scanning problem directories...\n');

  const problems = findAllProblems(problemsDir);

  console.log(`\n✅ Found ${problems.length} valid problem(s)`);

  if (problems.length === 0) {
    console.log('⚠️  No problems found, skipping index generation');
    process.exit(0);
  }

  const index = generateIndex(problems);
  const outputPath = join(problemsDir, 'index.json');

  writeFileSync(outputPath, JSON.stringify(index, null, 2), 'utf-8');

  console.log(`\n✨ Generated: ${outputPath}`);

  // 요약 출력
  console.log('\n📊 Summary by category:');
  const categoryCounts = problems.reduce((acc, p) => {
    const category = p.category || 'unknown';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  Object.entries(categoryCounts).forEach(([category, count]) => {
    console.log(`   ${category}: ${count}`);
  });
}

main();
