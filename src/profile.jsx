import Header_prof from "./components/Header_prof.jsx";
import NavBar from "./components/NavBar.jsx";
import React, { useState } from "react";
import pic from "./assets/profile.png";
import { useRef } from "react";
import Blank from "./components/Blank.jsx";
import { getAuth, updateProfile, updatePassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState("admin");

  const asteriskString = "*".repeat(password.length);
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

  const [displayName, setDisplayName] = useState("");

  const user = auth.currentUser;

  const handleSubmit = () => {
    if (user) {
      updateProfile(user, { displayName: displayName })
        .then(() => {
          // Profile updated
          if (password) {
            updatePassword(user, password)
              .then(() => {
                // Password updated
              })
              .catch((error) => {
                // An error occurred
              });
          }
        })
        .catch((error) => {
          // An error occurred
        });
    }
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
            // style={{ display: "none" }}
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
            Name:{""} <br />
            {isEditing ? (
              <input
                type="text"
                value={displayName}
                onChange={(event) => setDisplayName(event.target.value)}
              />
            ) : (
              <div className="BoxName">
                <b style={{ fontSize: "30px" }}>{displayName}</b>
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
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            ) : (
              <div className="BoxName">
                <b style={{ fontSize: "30px" }}>{asteriskString}</b>
              </div>
            )}
          </label>
          <button type="submit" onClick={isEditing ? handleSubmit : null}>
            {isEditing ? "Save" : "Edit"}{" "}
          </button>
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