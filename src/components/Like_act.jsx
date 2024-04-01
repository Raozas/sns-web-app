import React, { useState } from "react";

const Like_act = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`Like_act ${isActive ? "active_comp" : ""}`} onClick={handleClick}>
      <svg
        width="25"
        height="23"
        viewBox="-0.7 -1 25 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20.9172 1.38599C18.4378 -0.726938 14.7503 -0.346882 12.4745 2.00132L11.5832 2.91979L10.6919 2.00132C8.4206 -0.346882 4.72863 -0.726938 2.24922 1.38599C-0.592151 3.81111 -0.741458 8.16365 1.80129 10.7924L10.5561 19.8323C11.1217 20.4159 12.0402 20.4159 12.6057 19.8323L21.3606 10.7924C23.9079 8.16365 23.7586 3.81111 20.9172 1.38599Z"
          fill="#fff"
          stroke="#B1A5A5"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default Like_act;
