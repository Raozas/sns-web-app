import Header_prof from "./components/Header_prof.jsx";
import NavBar from "./components/NavBar.jsx";
import React, { useEffect, useState } from "react";
import pic from "./assets/profile.png";
import { useRef } from "react";
import Blank from "./components/Blank.jsx";
import { getAuth, updateProfile, updatePassword } from "firebase/auth";
import { auth, storage } from "./firebaseConfig";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Profile = () => {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState();

  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName);
      setPassword(user.password);
      setUrl(user.photoURL);
      console.log((window.user = user));
    }
  }, [user]);

  const asteriskString = "*".repeat(password?.length);
  const [image, setImage] = useState("");
  const inputRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!image) {
      console.log("No image selected");
      return;
    }

    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // You can add a progress function here to track the upload progress
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log("Upload error: ", error);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setUrl(downloadURL);

          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          })
            .then(() => {
              console.log("Profile picture updated");
            })
            .catch((error) => {
              console.log("Error updating profile picture: ", error);
            });
        });
      }
    );
  };

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
        <div className="aVa">
          {image ? (
            <>
              <img
                src={URL.createObjectURL(image)}
                alt=""
                className="img-display-after"
                id="image"
              />
              <button onClick={handleUpload}>Upload</button>
            </>
          ) : (
            <img
              onClick={handleImageClick}
              src={url ? url : pic}
              alt=""
              className="img-display-before img-display-after"
            />
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
