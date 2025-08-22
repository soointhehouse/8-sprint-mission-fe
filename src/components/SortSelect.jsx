import { useEffect, useRef, useState } from "react";
import "./SortSelect.css";

const OPTIONS = [
  { value: "latest", label: "최신순" },
  { value: "favorite", label: "좋아요순" },
];

export default function SortSelect({ value = "latest", onChange }) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const listRef = useRef(null);
  const current = OPTIONS.find(o => o.value === value) ?? OPTIONS[0];

  useEffect(() => {
    const onDoc = (e) => {
      if (!btnRef.current || !listRef.current) return;
      if (!btnRef.current.contains(e.target) && !listRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const onKeyDown = (e) => {
    if (e.key === "Escape") setOpen(false);
    if ((e.key === "Enter" || e.key === " ") && !open) { e.preventDefault(); setOpen(true); }
  };

  const select = (v) => { onChange?.(v); setOpen(false); btnRef.current?.focus(); };

  return (
    <div className="ss">
      <button
        type="button"
        className={`ss__button ${open ? "is-open" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        onKeyDown={onKeyDown}
        ref={btnRef}
      >
        <span className="ss__label">{current.label}</span>
        <img src="/img/arrow-down.png" alt="" className="ss__chev" />
      </button>

      {open && (
        <ul className="ss__menu" role="listbox" aria-label="정렬 옵션" ref={listRef}>
          {OPTIONS.map((o) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              className={`ss__option ${o.value === value ? "is-selected" : ""}`}
              onClick={() => select(o.value)}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}