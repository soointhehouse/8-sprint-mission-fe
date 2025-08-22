import { useEffect, useState } from "react";

const BASE_URL = "https://panda-market-api.vercel.app";

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function pickListTotal(data) {
  // API 응답 구조가 변경되더라도 안전하게
  const list = data?.list ?? data?.products ?? data?.items ?? [];
  const total = data?.total ?? data?.count ?? list.length ?? 0;
  return { list, total };
}

export function useProducts({ page = 1, pageSize = 10, sort = "recent", keyword = "" }) {
  const [data, setData] = useState({ list: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        setLoading(true);
        setError("");
        const params = new URLSearchParams({ page, pageSize, sort });
        if (keyword) params.set("keyword", keyword);
        const json = await fetchJson(`${BASE_URL}/products?${params.toString()}`);
        if (!cancelled) setData(pickListTotal(json));
      } catch (e) {
        if (!cancelled) setError(e.message || "요청 실패");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [page, pageSize, sort, keyword]);

  return { ...data, loading, error };
}

export function useBestProducts({ limit = 4 } = {}) {
  // best = sort=favorite + pageSize=limit
  return useProducts({ page: 1, pageSize: limit, sort: "favorite" });
}