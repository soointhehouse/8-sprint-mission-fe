import { useEffect, useState } from "react";

export default function useBreakpoint() {
  // 1024px 이하: tablet, 768px 이하: mobile
  const queryTablet = "(max-width: 1024px)";
  const queryMobile = "(max-width: 768px)";
  const [bp, setBp] = useState({ type: "desktop", bestLimit: 4, allColumns: 5 });

  useEffect(() => {
    const mqlTablet = window.matchMedia(queryTablet);
    const mqlMobile = window.matchMedia(queryMobile);

    const compute = () => {
      if (mqlMobile.matches) {
        setBp({ type: "mobile", bestLimit: 1, allColumns: 2 });
      } else if (mqlTablet.matches) {
        setBp({ type: "tablet", bestLimit: 2, allColumns: 3 });
      } else {
        setBp({ type: "desktop", bestLimit: 4, allColumns: 5 });
      }
    };

    compute();
    mqlTablet.addEventListener("change", compute);
    mqlMobile.addEventListener("change", compute);
    return () => {
      mqlTablet.removeEventListener("change", compute);
      mqlMobile.removeEventListener("change", compute);
    };
  }, []);

  // 전체 목록 pageSize = 열수 × 2행
  const allPageSize = bp.allColumns * 2;

  return { ...bp, allPageSize };
}