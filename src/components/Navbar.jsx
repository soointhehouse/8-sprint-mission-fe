import "./Navbar.css";

export default function Navbar() {
  return (
    <header className="nav">
      <div className="nav-inner">
        {/* 왼쪽: 로고 + 메뉴 (하나의 그룹으로 묶기) */}
        <div className="left">
          <a href="/" className="brand" aria-label="판다마켓 홈">
            <span className="badge">
              <img src="/img/logo-panda.png" alt="" />
            </span>
            <span className="brand-name">판다마켓</span>
          </a>

          <nav className="menu" aria-label="주 메뉴">
            <a href="/boards">자유게시판</a>
            <a href="/market">중고마켓</a>
          </nav>
        </div>

        {/* 오른쪽: 로그인 */}
        <a href="/login" className="login-btn">로그인</a>
      </div>
    </header>
  );
}