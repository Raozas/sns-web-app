import Blank from "./components/Blank";
import Bookmarked from "./components/Bookmarked";
import HeaderBookmark from "./components/HeaderBookmark";
import NavBar from "./components/NavBar";

const Bookmark = () => {
  return (
    <div>
      <HeaderBookmark />
      <div className="content">
        <Bookmarked />
        <Blank />
      </div>
      <div className="nav">
        <NavBar />
      </div>
    </div>
  );
};

export default Bookmark;
