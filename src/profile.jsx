import Header_prof from "./components/Header_prof.jsx";
import NavBar from "./components/NavBar.jsx";
import React, { useState } from "react";
import pic from "./assets/profile.png";
import { useRef } from "react";
import Blank from "./components/Blank.jsx";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("Akito");
  const [Password, setPassword] = useState("Raozas");
  const asteriskString = "*".repeat(Password.length);
  const [image, setImage] = useState("");
  const inputRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <Header_prof />
      <div className="content">
        <div className="aVa" onClick={handleImageClick}>
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt=""
              className="img-display-after"
              id="image"
            />
          ) : (
            <img src={pic} alt="" className="img-display-before" />
          )}

          <input
            type="file"
            name=""
            id=""
            ref={inputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        <form
          className="profForm"
          onSubmit={(e) => {
            e.preventDefault();
            setIsEditing(!isEditing);
          }}
        >
          <label>
            First name:{""} <br />
            {isEditing ? (
              <input
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            ) : (
              <div className="BoxName">
                <b style={{ fontSize: "30px" }}>{firstName}</b>
              </div>
            )}
          </label>
        </form>
        <form
          className="profForm"
          onSubmit={(e) => {
            e.preventDefault();
            setIsEditing(!isEditing);
          }}
        >
          <label>
            Password:{""} <br />
            {isEditing ? (
              <input
                type="password"
                value={Password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            ) : (
              <div className="BoxName">
                <b style={{ fontSize: "30px" }}>{asteriskString}</b>
              </div>
            )}
          </label>
          <button type="submit">{isEditing ? "Save" : "Edit"} </button>
        </form>
        <Blank />
      </div>
      <div className="nav">
        <NavBar />
      </div>
    </div>
  );
};
export default Profile;
