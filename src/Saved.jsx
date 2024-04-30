import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import Blank from "./components/Blank";
import HeaderSaved from "./components/HeaderSaved";
import NavBar from "./components/NavBar";
import Liked from "./components/Liked";
import { db } from "./firebaseConfig.js";
import Message from "./components/Message.jsx";

const Saved = () => {
  const [likedMessages, setLikedMessages] = useState([]);

  useEffect(() => {
    const fetchLikedMessages = async () => {
      const q = query(collection(db, "messages"), where("isLiked", "==", true));
      const querySnapshot = await getDocs(q);
      let messages = [];
      querySnapshot.forEach((doc) => {
        messages.push(doc.data());
      });
      setLikedMessages(messages);
    };

    fetchLikedMessages();
  }, []);

  return (
    <div>
      <HeaderSaved />
      <div className="content">
        <div>
          {likedMessages.length > 0 ? (
            likedMessages.map((message) => (
              // Replace this with your actual message component

              <>
                <Message key={message.id} data={message} />
                <Blank />
              </>
            ))
          ) : (
            <div>No liked messages</div>
          )}
        </div>

        <Blank />
      </div>
      <div className="nav">
        <NavBar />
      </div>
    </div>
  );
};

export default Saved;
