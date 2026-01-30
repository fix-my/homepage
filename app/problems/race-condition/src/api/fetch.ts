import searchData from "./search.json";

type SearchData = {
  [key: string]: {
    results: string[];
  };
};

const data: SearchData = searchData;

// 검색어별 응답 지연 시간 (실제 DB 조회 속도 차이 시뮬레이션)
const delays: Record<string, number> = {
  react: 300,
  vue: 200,
  angular: 100,
  javascript: 250,
  typescript: 150,
};

const fetch = (url: string) => {
  return new Promise<{ results: string[] }>((resolve) => {
    const urlObj = new URL(url, "http://localhost");
    const query = urlObj.searchParams.get("q")?.toLowerCase();
    const delay = (query && delays[query]) || 100;

    setTimeout(() => {
      if (query && data[query]) {
        resolve(data[query]);
      } else {
        resolve({ results: [] });
      }
    }, delay);
  });
};

export default fetch;
