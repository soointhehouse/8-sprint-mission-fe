import { useEffect, useMemo, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../index.css";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import SortSelect from "../components/SortSelect";

function useResponsive() {
  const getState = () => {
    const w = window.innerWidth;
    const isMobile = w <= 768;
    const isTablet = w <= 1024 && w > 768;
    const bestCols = isMobile ? 1 : isTablet ? 2 : 4;
    const allCols  = isMobile ? 2 : isTablet ? 3 : 5;
    const pageSize = allCols * 2;
    return { bestCols, allCols, pageSize };
  };
  const [state, setState] = useState(getState);
  useEffect(() => {
    const onResize = () => setState(getState());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return state;
}

const BASE = "https://panda-market-api.vercel.app";

export default function MarketPage() {
  const { bestCols, pageSize } = useResponsive();

  // 컨트롤
  const [sort, setSort] = useState("latest");       // 'latest' | 'favorite'
  const [page, setPage] = useState(1);
  const [typed, setTyped] = useState("");           // 입력값
  const [keyword, setKeyword] = useState("");       // 디바운스 결과

  // 데이터
  const [best, setBest] = useState([]);
  const [list, setList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingBest, setLoadingBest] = useState(false);
  const [loadingAll, setLoadingAll] = useState(false);

  // 검색 디바운스
  useEffect(() => {
    const t = setTimeout(() => { setKeyword(typed); setPage(1); }, 300);
    return () => clearTimeout(t);
  }, [typed]);

  // 베스트(좋아요순)
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingBest(true);
        const url = new URL(`${BASE}/products`);
        url.searchParams.set("page", "1");
        url.searchParams.set("pageSize", String(bestCols));
        url.searchParams.set("sort", "favorite");
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const arr = Array.isArray(data?.list) ? data.list : data;
        if (alive) setBest(arr || []);
      } finally { if (alive) setLoadingBest(false); }
    })();
    return () => { alive = false; };
  }, [bestCols]);

  // 전체 리스트(정렬/검색/페이지)
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoadingAll(true);
        const url = new URL(`${BASE}/products`);
        url.searchParams.set("page", String(page));
        url.searchParams.set("pageSize", String(pageSize));
        if (keyword) url.searchParams.set("keyword", keyword);
        url.searchParams.set("sort", sort === "favorite" ? "favorite" : "latest");
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const arr = Array.isArray(data?.list) ? data.list : data;
        if (alive) {
          setList(arr || []);
          setTotalCount(typeof data?.totalCount === "number" ? data.totalCount : 0);
        }
      } finally { if (alive) setLoadingAll(false); }
    })();
    return () => { alive = false; };
  }, [page, pageSize, sort, keyword]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil((totalCount || 1) / pageSize)), [totalCount, pageSize]);

  return (
    <main className="market main-offset">
      <div className="container">
        {/* 베스트 */}
        <h2 className="section-title">베스트 상품</h2>
        <div className="grid best-products">
          {loadingBest
            ? Array.from({ length: bestCols }).map((_, i) => <div className="skeleton" key={i} />)
            : best.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>

        {/* 판매 중인 상품: 제목 + 검색 + 등록 + 정렬 */}
        <div className="section-header">
          <h2 className="section-title">판매 중인 상품</h2>
          <div className="toolbar toolbar--compact">
            <SearchBar
              className="toolbar__search"
              value={typed}
              onChange={setTyped}
              onSubmit={(v) => setTyped(v)}
              placeholder="검색할 상품을 입력해주세요"
            />
            <button type="button" className="btn btn--primary">상품 등록하기</button>
            <SortSelect value={sort} onChange={(v) => { setSort(v); setPage(1); }} />
          </div>
        </div>

        {/* 리스트 */}
        <div className="grid all-products">
          {loadingAll
            ? Array.from({ length: pageSize }).map((_, i) => <div className="skeleton" key={i} />)
            : list.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>

        {/* 페이지네이션 */}
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </main>
  );
}