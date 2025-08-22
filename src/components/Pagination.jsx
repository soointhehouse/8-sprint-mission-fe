import "./Pagination.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  // 페이지 배열: 너무 많으면 1~5까지만 잘라 예시 (필요시 로직 확장 가능)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5);

  return (
    <div className="pagination">
      {/* 이전 화살표 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>

      {/* 페이지 숫자 */}
      {pages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? "active" : ""}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* 다음 화살표 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
}