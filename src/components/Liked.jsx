import Bookmark_act from "./Bookmark_act.jsx";
import Liked_act from "./Liked_act.jsx";
import Comment_act from "./Comment_act.jsx";

const MessageL = () => {
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
              <Liked_act />
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

export default MessageL;