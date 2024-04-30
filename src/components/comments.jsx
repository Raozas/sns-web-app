import { useState } from "react";
import Comment from "./comment";

export default function Comments({ data }) {
  const [comments, setComments] = useState([...data]);


  return (
    <>
      {comments.length > 0 && (
        <div className="Comment">
          {comments.map((comment) => (
            <Comment key={comment.id} messageID={data.id} data={comment} setComments={setComments} />
          ))}
        </div>
      )}
    </>
  );
}
