import {useState} from "react";


const NewMessage = ({ data }) => {
  const [message, setMessage] = useState('');
  const [isButton, setIsButton] = useState(true);

  const { user, content, time, isLiked, isBookmarked, isCommented } = data;

  const handleClick = () => {
    setIsButton(false);
  };
  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };
  const handleCancelClick = () => {
    setIsButton(true);
    setMessage('');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can handle the submit event, for example, send the message to the server
    console.log(message);
    setMessage('');
  };
  return (
    <div className="box">
      {isButton ? (
        <div className="plus" onClick={handleClick}>
          <svg
            width="46"
            height="46"
            viewBox="0 0 46 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="23" cy="23" r="23" fill="#FAEDCA"/>
            <path
              d="M12.0632 24H34.0632"
              stroke="#FFC938"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M23.0632 13L23.0632 35"
              stroke="#FFC938"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ) : (
        <div className="newMessage">
          <input
            type="text"
            id="newMessage"
            placeholder="New Message"
            value={message}
            onChange={handleInputChange}
          />
          <button type="submit" onClick={handleSubmit}>
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.51113 6.92571C1.1623 7.02538 0.845536 7.21441 0.592189 7.47409C0.338842 7.73377 0.15769 8.05509 0.0666582 8.40628C-0.0243739 8.75746 -0.0221311 9.12633 0.0731648 9.47638C0.168461 9.82643 0.353507 10.1455 0.609992 10.4021L4.16452 13.9525V20.8136H11.0329L14.6114 24.3869C14.8035 24.5806 15.032 24.7344 15.2837 24.8396C15.5354 24.9447 15.8055 24.999 16.0783 24.9994C16.2575 24.9991 16.4361 24.976 16.6096 24.9307C16.9606 24.8423 17.2821 24.6629 17.5418 24.4107C17.8015 24.1585 17.9902 23.8424 18.0889 23.4941L25 0L1.51113 6.92571ZM2.09035 8.92904L19.8297 3.69934L6.25016 17.257V13.0899L2.09035 8.92904ZM16.0918 22.9138L11.8966 18.7301H7.72947L21.3069 5.16407L16.0918 22.9138Z"
                fill="#000"
              />
            </svg>
          </button>
          <div onClick={handleCancelClick} className="cancel">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.77832 8.56476L23.3347 24.1211"
                stroke="#000"
                strokeWidth="6"
                strokeLinecap="round"
              />
              <path
                d="M23.3344 8.56476L7.778 24.1211"
                stroke="#000"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
export default NewMessage;
