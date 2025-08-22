import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MarketPage from "./pages/MarketPage";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="main-offset">
        <MarketPage />
      </main>
      <Footer />
    </Router>
  );
}



/*
한 파일에 export default는 무조건 한 번만

두 방법 중 아무거나 써도 되지만, 같은 파일에서 두 번 쓰면 에러

팀에서 코딩 스타일이 정해져 있다면 거기에 맞추는 게 안전

export default 를 왜하나요 ? 다른 파일에서 import하기 위해 
*/
export default App;