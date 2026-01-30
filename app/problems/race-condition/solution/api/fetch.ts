import searchData from "./search.json";

type SearchData = {
  [key: string]: {
    results: string[];
  };
};

const data: SearchData = searchData;

const fetch = (url: string, options?: { signal?: AbortSignal }) => {
  return new Promise<{ results: string[] }>((resolve, reject) => {
    // AbortSignal 처리
    if (options?.signal?.aborted) {
      const error = new Error("Aborted");
      error.name = "AbortError";
      reject(error);
      return;
    }

    // signal에 abort 이벤트 리스너 추가
    const abortHandler = () => {
      const error = new Error("Aborted");
      error.name = "AbortError";
      reject(error);
    };

    options?.signal?.addEventListener("abort", abortHandler);

    // URL 파싱하여 query 파라미터 추출
    const urlObj = new URL(url, "http://localhost");
    const query = urlObj.searchParams.get("q")?.toLowerCase();

    // 네트워크 지연 시뮬레이션
    setTimeout(() => {
      options?.signal?.removeEventListener("abort", abortHandler);

      if (options?.signal?.aborted) {
        const error = new Error("Aborted");
        error.name = "AbortError";
        reject(error);
        return;
      }

      if (query && data[query]) {
        resolve(data[query]);
      } else {
        resolve({ results: [] });
      }
    }, 100);
  });
};

export default fetch;
