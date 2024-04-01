import Bookmark_act from "./Bookmark_act.jsx";
import Like_act from "./Like_act.jsx";
import Comment_act from "./Comment_act.jsx";
import React, { useState } from "react";
import Comment from "./comment.jsx";

const Message = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="Message">
      <div className="user">
        <div className="userAva"></div>
        <div className="userInfo">
          <div className="userName">Anna</div>
          <div className="sentTime">15.30</div>
        </div>
      </div>
      <div className="MessContent">
        <div className="line"></div>
        <div className="MessComps">
          <div className="text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque iste
            rem minus animi maiores esse ipsam dignissimos! Quidem fugit aliquid
            amet, quis ipsum beatae impedit illum molestias, earum, id
            repellendus!
          </div>
          <div className="actions">
            <div>
              <Bookmark_act />
            </div>
            <div>
              <Like_act />
            </div>
            <div onClick={handleToggleVisibility}>
              <Comment_act />
              
            </div> 
          </div>
               
          {isVisible ? (
          <div className="Comment" >
              <Comment/>
            </div>) : ""}
        </div>
      </div>
    </div>
  );
};

export default Message;
