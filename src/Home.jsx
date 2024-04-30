import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocsFromServer,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebaseConfig.js";
import Header from "./components/Header.jsx";
import NewMessage from "./components/newMessage.jsx";
import Blank from "./components/Blank.jsx";
import NavBar from "./components/NavBar.jsx";
import MyMessage from "./components/MyMessage.jsx";
import Message from "./components/Message.jsx";
const Home = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [updatedMessage, setUpdatedMessage] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesQuery = query(
          collection(db, "messages"),
          orderBy("time")
        );
        const messagesSnapshot = await getDocsFromServer(messagesQuery);
        const messagesData = messagesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(messagesData);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [db]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const messageData = {
        user: user.displayName,
        time: Timestamp.fromDate(new Date()),
        isLiked: false,
        isBookmarked: false,
        isCommented: false,
        content: newMessage,
      };
      const docRef = await addDoc(collection(db, "messages"), messageData);
      setMessages((oldMessages) => [
        ...oldMessages,
        { id: docRef.id, ...messageData },
      ]);
      setNewMessage("");
    }
  };

  return (
    <div>
      <Header />
      <div className="content">
        {messages.map((e) =>
          e.user === getAuth().currentUser.displayName ? (
            <div key={e.id}>
              <MyMessage
                setMessages={setMessages}
                data={e}
                newMessage={updatedMessage}
              />
              <Blank />
            </div>
          ) : (
            <div key={e.id}>
              <Message data={e} />
              <Blank />
            </div>
          )
        )}
        <form onSubmit={handleSubmit} className="newMessage">
          <input
            className="newMess"
            type="text"
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
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
