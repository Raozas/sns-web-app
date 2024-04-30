import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import Blank from "./components/Blank";
import HeaderBookmark from "./components/HeaderBookmark";
import NavBar from "./components/NavBar";
import { db } from "./firebaseConfig.js";
import Message from './components/Message.jsx';

const Bookmark = () => {
  const [bookmarkedMessages, setBookmarkedMessages] = useState([]);

  useEffect(() => {
    const fetchBookmarkedMessages = async () => {
      const q = query(collection(db, "messages"), where("isBookmarked", "==", true));
      const querySnapshot = await getDocs(q);
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setBookmarkedMessages(messages);
    };

    fetchBookmarkedMessages();
  }, []);

  return (
    <div>
      <HeaderBookmark />
      <div className="content">
        {bookmarkedMessages.length > 0 ? (
          bookmarkedMessages.map((message) => (
            // Replace this with your actual message component
            <>
            <Message key={message.id} data={message} />
            <Blank />
            </>
          ))
        ) : (
          <>
        <Blank />
        <Blank />
          </>
        )}
      </div>
      <div className="nav">
        <NavBar />
      </div>
    </div>
  );
};

export default Bookmark;