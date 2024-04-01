import Header from "./components/Header.jsx";
import NavBar from "./components/NavBar.jsx";
import Message from "./components/Message.jsx";
import Blank from "./components/Blank.jsx";
import MyMessage from "./components/MyMessage.jsx";
import NewMessage from "./components/newMessage.jsx";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="content">
        <Message />
        <MyMessage />
        <Message />
        <NewMessage />
        <Message />
        <Message />
        <Blank />
      </div>
      <div className="newMessage"></div>
      <div className="nav">
        <NavBar />
      </div>
    </div>
  );
};
export default Home;
