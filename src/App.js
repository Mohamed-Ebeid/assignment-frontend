import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import AdminPage from "./pages/AdminPage";
import PlayerPage from "./pages/PlayerPage";
import Venue from "./pages/Venue";

function App() {
  //Using basic React rounting
  return (
    <div className="container">
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/player" element={<PlayerPage />} />
            <Route path="/venue/:name" element={<Venue />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
