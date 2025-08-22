import "./ProductCard.css";

const PLACEHOLDER = "/img/placeholder.png";
const HEART_ICON = "/img/heart.png";

function resolveImage(p) {
  const list = Array.isArray(p.images) ? p.images : (p.images ? [p.images] : []);
  const url = list.find((u) => typeof u === "string" && u.trim());
  if (!url) return PLACEHOLDER;
  const isAbs = /^(https?:)?\/\//i.test(url) || url.startsWith("data:");
  if (!isAbs) return PLACEHOLDER;
  if (typeof window !== "undefined" && window.location.protocol === "https:" && url.startsWith("http://")) {
    return PLACEHOLDER;
  }
  return url;
}

export default function ProductCard({ p = {} }) {
  const title = p.name ?? "상품명";
  const price =
    typeof p.price === "number" ? `${p.price.toLocaleString()}원` : (p.price ?? "");
  const fav = p.favoriteCount ?? 0;
  const src = resolveImage(p);

  return (
    <article className="pcard">
      <div className="pcard__thumb">
        <img
          src={src}
          alt={title}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => { if (e.currentTarget.src !== PLACEHOLDER) e.currentTarget.src = PLACEHOLDER; }}
        />
      </div>

      <div className="pcard__body">
        <div className="pcard__title" title={title}>{title}</div>
        <div className="pcard__price">{price}</div>
        
        <div className="pcard__fav">
          <div className="pcard__fav">
          <img src={HEART_ICON} alt="좋아요" className="pcard__fav-icon" />
          <span>{fav}</span>
          </div>
        </div>
      </div>
    </article>
  );
}