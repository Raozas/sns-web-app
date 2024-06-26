import format from "date-fns/format";
import React, { useEffect, useState } from "react";
import {
  doc,
  collection,
  getDocs,
  orderBy,
  query,
  deleteDoc,
  updateDoc,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig.js";
import Comment from "./comment.jsx";
import Comment_act from "./Comment_act.jsx";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const MyMessage = ({ data, setMessages, newMessage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCommenting, setIsCommenting] = useState(false);
  const [isCommented, setIsCommented] = useState(false);
  const [Visible, setVisible] = useState(false);
  const [editMessage, setEditMessage] = useState(data.content);
  const { user, content, time, isLiked, isBookmarked } = data;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [photoURL, setPhotoURL] = useState(null);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const messageRef = doc(db, 'messages', data.id);
    const commentsCollection = collection(messageRef, 'comments');
    const newCommentData = {
      user: getAuth().currentUser.displayName,
      content: newComment,
      time: Timestamp.fromDate(new Date()),
    };
    const docRef = await addDoc(commentsCollection, newCommentData);
    setNewComment("");
    setComments([...comments, { id: docRef.id, ...newCommentData }]);
    setIsCommenting(false);
  };

  useEffect(() => {
    async function getComments() {
      const messageRef = doc(db, 'messages', data.id);
      const commentsCollection = collection(messageRef, 'comments');
      const q = query(commentsCollection, orderBy("time", "asc")); // sort by time in descending order
      const commentsSnapshot = await getDocs(q);
      const commentsList = commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(commentsList);
      setIsCommented(commentsList.length > 0);
    }

    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPhotoURL(user.photoURL);
      }
    });

    getComments();
  }, [data.id]);

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleIsToggleVisibility = () => {
    setVisible(!Visible);
    setIsVisible(false);
  };

  const handleDelete = async () => {
    const messageRef = doc(db, "messages", data.id); // Replace messageId with the actual ID
    await deleteDoc(messageRef);
    setMessages((oldMessages) =>
      oldMessages.filter((message) => message.id !== data.id)
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const messageRef = doc(db, "messages", data.id);
    await updateDoc(messageRef, { content: editMessage });
    setVisible(false);
    setMessages((oldMessages) =>
      oldMessages.map((message) => {
        if (message.id === data.id) {
          return { ...message, content: editMessage };
        } else {
          return message;
        }
      })
    );
  };

  return (
    <div className="MyMessage" id="MyMessage">
      <div className="userMe">
        <div className="userAva">{photoURL && <img  src={photoURL} alt="User" />}</div>
        <div className="userInfo">
          <div className="userName">{user}</div>
          <div className="sentTime">
            {time && format(time.toDate(), "HH:mm")}
          </div>
        </div>
      </div>
      <div className="MessContent">
        <div className="line"></div>
        <div className="MessComps">
          <div className="text">
            <div id="text">
              {Visible ? (
                <form onSubmit={handleUpdate}>
                  <textarea
                    value={editMessage}
                    onChange={(e) => setEditMessage(e.target.value)}
                  />
                  <button type="submit" onClick={handleUpdate}>
                    Update
                  </button>
                </form>
              ) : (
                content
              )}
            </div>
          </div>
          <div className="actions">
            <div onClick={handleToggleVisibility}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
              >
                <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
              </svg>
            </div>
            <div
              className="actOtions"
              style={{ display: isVisible ? "flex" : "none" }}
            >
              <div className="change" onClick={handleIsToggleVisibility}>
                <svg
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.1581 1.55686C17.6179 1.02948 16.8858 0.733276 16.1224 0.733276C15.3591 0.733276 14.627 1.02948 14.0868 1.55686L1.16404 14.1927C0.793978 14.5525 0.500555 14.9805 0.300752 15.4519C0.100948 15.9233 -0.00126969 16.4288 1.19035e-05 16.9391V18.5341C1.19035e-05 18.7402 0.0837243 18.9378 0.232733 19.0835C0.381743 19.2292 0.583842 19.311 0.794573 19.311H2.42581C2.94764 19.3125 3.46459 19.2127 3.94672 19.0175C4.42885 18.8222 4.86658 18.5354 5.23458 18.1736L18.1581 5.53702C18.6972 5.00887 19 4.29315 19 3.54694C19 2.80074 18.6972 2.08501 18.1581 1.55686ZM4.11107 17.0751C3.66294 17.5103 3.05745 17.7554 2.42581 17.7572H1.58913V16.9391C1.58833 16.6329 1.64964 16.3296 1.76953 16.0468C1.88941 15.7639 2.06549 15.5071 2.28755 15.2913L12.0948 5.70173L13.9223 7.48865L4.11107 17.0751ZM17.0338 4.43846L15.0426 6.3862L13.2151 4.60316L15.2071 2.65543C15.3271 2.53835 15.4695 2.44553 15.6262 2.38227C15.7829 2.319 15.9508 2.28654 16.1203 2.28672C16.2898 2.2869 16.4576 2.31972 16.6141 2.38332C16.7707 2.44692 16.9129 2.54004 17.0326 2.65737C17.1524 2.7747 17.2473 2.91394 17.312 3.06714C17.3767 3.22034 17.4099 3.38451 17.4097 3.55026C17.4095 3.71601 17.3759 3.8801 17.3109 4.03316C17.2459 4.18623 17.1506 4.32527 17.0306 4.44234L17.0338 4.43846Z"
                    fill="black"
                  />
                </svg>
                <div className="option">編集</div>
              </div>
              <div className="menuLine"></div>
              <div className="delete" onClick={handleDelete}>
                <div>
                  <svg
                    width="21"
                    height="26"
                    viewBox="0 0 21 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.7917 4.87412H16.5625C16.3207 3.72464 15.6811 2.69179 14.7513 1.94967C13.8215 1.20755 12.6586 0.80153 11.4583 0.800049L9.375 0.800049C8.17479 0.80153 7.01179 1.20755 6.08203 1.94967C5.15227 2.69179 4.5126 3.72464 4.27083 4.87412H1.04167C0.7654 4.87412 0.500448 4.98143 0.305097 5.17244C0.109747 5.36345 0 5.62251 0 5.89264C0 6.16277 0.109747 6.42183 0.305097 6.61284C0.500448 6.80385 0.7654 6.91116 1.04167 6.91116H2.08333V20.1519C2.08499 21.502 2.63425 22.7964 3.61065 23.7511C4.58704 24.7058 5.91084 25.2429 7.29167 25.2445H13.5417C14.9225 25.2429 16.2463 24.7058 17.2227 23.7511C18.1991 22.7964 18.7484 21.502 18.75 20.1519V6.91116H19.7917C20.0679 6.91116 20.3329 6.80385 20.5282 6.61284C20.7236 6.42183 20.8333 6.16277 20.8333 5.89264C20.8333 5.62251 20.7236 5.36345 20.5282 5.17244C20.3329 4.98143 20.0679 4.87412 19.7917 4.87412ZM9.375 2.83709H11.4583C12.1045 2.83786 12.7345 3.03404 13.2621 3.39874C13.7897 3.76344 14.189 4.27879 14.4052 4.87412H6.42813C6.64436 4.27879 7.04365 3.76344 7.57124 3.39874C8.09883 3.03404 8.72888 2.83786 9.375 2.83709ZM16.6667 20.1519C16.6667 20.9623 16.3374 21.7395 15.7514 22.3125C15.1653 22.8855 14.3705 23.2075 13.5417 23.2075H7.29167C6.46287 23.2075 5.66801 22.8855 5.08196 22.3125C4.49591 21.7395 4.16667 20.9623 4.16667 20.1519V6.91116H16.6667V20.1519Z"
                      fill="black"
                    />
                    <path
                      d="M8.31706 19.1334C8.59332 19.1334 8.85828 19.0261 9.05363 18.8351C9.24898 18.644 9.35872 18.385 9.35872 18.1149V12.0037C9.35872 11.7336 9.24898 11.4746 9.05363 11.2835C8.85828 11.0925 8.59332 10.9852 8.31706 10.9852C8.04079 10.9852 7.77584 11.0925 7.58049 11.2835C7.38514 11.4746 7.27539 11.7336 7.27539 12.0037V18.1149C7.27539 18.385 7.38514 18.644 7.58049 18.8351C7.77584 19.0261 8.04079 19.1334 8.31706 19.1334Z"
                      fill="black"
                    />
                    <path
                      d="M12.4837 19.1334C12.76 19.1334 13.025 19.0261 13.2203 18.8351C13.4157 18.644 13.5254 18.385 13.5254 18.1149V12.0037C13.5254 11.7336 13.4157 11.4746 13.2203 11.2835C13.025 11.0925 12.76 10.9852 12.4837 10.9852C12.2075 10.9852 11.9425 11.0925 11.7472 11.2835C11.5518 11.4746 11.4421 11.7336 11.4421 12.0037V18.1149C11.4421 18.385 11.5518 18.644 11.7472 18.8351C11.9425 19.0261 12.2075 19.1334 12.4837 19.1334Z"
                      fill="black"
                    />
                  </svg>
                </div>

                <div className="option">削除</div>
              </div>
            </div>
            <div onClick={() => setIsCommenting(true)}>
              <Comment_act isCommented={isCommented} />
            </div>
            {isCommenting && (
              <form onSubmit={handleCommentSubmit}>
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment"
                />
                <button type="submit">Submit</button>
              </form>
            )}

            {comments.map((comment) => (
              <Comment key={comment.id} messageID={data.id} setComments={setComments} data={comment} />
            ))}
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyMessage;
