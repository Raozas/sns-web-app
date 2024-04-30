import Bookmark_act from "./Bookmark_act.jsx";
import Like_act from "./Like_act.jsx";
import Comment_act from "./Comment_act.jsx";
import { useEffect, useState } from "react";
import Comment from "./comment.jsx";
import format from "date-fns/format";
import "./MyMessage.css";
import {
  doc,
  updateDoc,
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  Timestamp,
  where,
  getFirestore
} from "firebase/firestore";
import { db } from "../firebaseConfig.js"; // import your Firestore instance
import { getAuth } from "firebase/auth";
import { set } from "date-fns";
import { id } from "date-fns/locale";

const Message = ({ data }) => {
  const { user, content, time, isLiked, isBookmarked } = data;
  const [isVisible, setIsVisible] = useState(false);
  const [isBookmarkedTrue, setIsBookmarkedTrue] = useState(isBookmarked);
  const [isLikedTrue, setIsLikedTrue] = useState(isLiked);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isCommented, setIsCommented] = useState(false);
  const [photoURL, setPhotoURL] = useState(data.photoUrl);

  useEffect(() => {
    async function getComments() {
      const messageRef = doc(db, "messages", data.id);
      const commentsCollection = collection(messageRef, "comments");
      const q = query(commentsCollection, orderBy("time", "asc")); // sort by time in descending order
      const commentsSnapshot = await getDocs(q);
      const commentsList = commentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentsList);
      setIsCommented(commentsList.length > 0);
    }

    getComments();
  }, [data.id]);

  

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    const messageRef = doc(db, "messages", data.id);
    const commentsCollection = collection(messageRef, "comments");
    const newCommentData = {
      user: getAuth().currentUser.displayName,
      content: newComment,
      time: Timestamp.fromDate(new Date()),
    };
    const docRef = await addDoc(commentsCollection, newCommentData);
    setNewComment("");
    setComments([...comments, { id: docRef.id, ...newCommentData }]);
    setIsVisible(false);
  };

  const handleBookmarkClick = async (id) => {
    const messageRef = doc(db, "messages", id);
    const newBookmarkState = !isBookmarkedTrue;
    setIsBookmarkedTrue(newBookmarkState); // Update local state
    await updateDoc(messageRef, {
      isBookmarked: newBookmarkState,
    });
  };

  const handleLikeClick = async (id) => {
    const messageRef = doc(db, "messages", id);
    const newLikedState = !isLikedTrue;
    setIsLikedTrue(newLikedState); // Update local state
    await updateDoc(messageRef, {
      isLiked: newLikedState,
    });
  };

  return (
    <div className="Message">
      <div className="user">
        <div className="userAva">{photoURL && <img src={photoURL} alt="User" />}</div>
        <div className="userInfo">
          <div className="userName">{user}</div>
          <div className="sentTime">
            {/* {
            format(time.toDate(), "HH:mm")
            // time.toDate().toString()
          } */}
            {time && format(time.toDate(), "HH:mm")}
          </div>
        </div>
      </div>
      <div className="MessContent">
        <div className="line"></div>
        <div className="MessComps">
          <div className="text">{content}</div>
          <div className="actions">
            <div>
              <Bookmark_act
                data={data}
                isBookmarked={isBookmarkedTrue}
                onClick={handleBookmarkClick}
              />
            </div>
            <div>
              <Like_act
                data={data}
                isLiked={isLikedTrue}
                onClick={handleLikeClick}
              />
            </div>
            <div onClick={handleToggleVisibility}>
              <Comment_act isCommented={isCommented} />
            </div>

            {isVisible && (
              <form onSubmit={handleCommentSubmit}>
                <textarea
                  value={newComment}
                  onChange={handleCommentChange}
                  placeholder="Add a comment"
                />
                <button type="submit">Submit</button>
              </form>
            )}
          </div>

          {comments.length > 0 && (
            <div className="Comment">
              {comments.map((comment) => (
                <Comment key={comment.id} messageID={data.id} setComments={setComments} data={comment} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
