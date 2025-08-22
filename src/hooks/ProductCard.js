export default function ProductCard() {
  return (
    <div className="product-card">
      <img src="/img/placeholder.jpg" alt="" />
      <div className="product-body">
        <div className="product-title">상품명</div>
        <div className="product-price">1,500,000원</div>
        <div className="product-meta"><span>❤️ 240</span></div>
      </div>
    </div>
  );
}

// 이게 지금 필요한 건지 아직 확실하지 않음 (지금상태론 쓸데없음)