import Bookmarked_act from "./Bookmarked_act.jsx";
import Like_act from "./Like_act.jsx";
import Comment_act from "./Comment_act.jsx";
import React, { useState } from "react";

const MessageB = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleVisibility = () => {
    setIsVisible(isVisible);
  };
  return (
    <div className="Message" style={{ display: isVisible ? 'none' : 'flex' }}>
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
              <Bookmarked_act onClick={handleToggleVisibility}  />
            </div>
            <div>
              <Like_act />
            </div>
            <div>
              <Comment_act />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageB;
