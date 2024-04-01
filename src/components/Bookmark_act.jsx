import React, { useState } from "react";

const Bookmark_act = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div
      className={`Bookmark_act ${isActive ? "active_comp_b" : ""}`}
      onClick={handleClick}
    >
      <svg
        width="19"
        height="22"
        viewBox="0 -1 15 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 20V1.875C0 0.839453 0.839453 0 1.875 0H13.125C14.1605 0 15 0.839453 15 1.875V20L7.5 15.625L0 20Z"
          fill="#fff"
          stroke="#B1A5A5"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default Bookmark_act;
