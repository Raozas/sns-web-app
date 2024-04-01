import Blank from "./components/Blank";
import HeaderSaved from "./components/HeaderSaved";
import NavBar from "./components/NavBar";
import Liked from "./components/Liked"


const Saved = () => {
  return (
    <div>
      <HeaderSaved />
      <div className="content">
        <Liked />
        
        <Blank />
      </div>
      <div className="nav">
        <NavBar />
      </div>
    </div>
  );
};

export default Saved;
