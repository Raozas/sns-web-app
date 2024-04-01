import { Routes, Route } from "react-router-dom";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import Home from "./Home.jsx";
import Bookmark from "./Bookmark.jsx";
import Profile from "./profile.jsx";
import Saved from "./Saved.jsx";


function App() {
  return (
    <div className="Auth_page">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="home" element={<Home />} />
        <Route path="bookmark" element={<Bookmark />} />
        <Route path="profile" element={<Profile />} />
        <Route path="saved" element={<Saved />} />
      </Routes>
    </div>
    
  );
}

export default App;
