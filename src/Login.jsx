import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer.jsx";
import Blank from "./components/Blank.jsx";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "./firebaseConfig";

const Login = () => {
  const [isEmail, setIsEmail] = useState("");
  const [isPass, setIsPass] = useState("");

  function handleEmail(e) {
    e.preventDefault();
    setIsEmail(e.target.value);
  }

  function handlePass(e) {
    e.preventDefault();
    setIsPass(e.target.value);
  }

  const navigate = useNavigate();

  let SignInUser = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, isEmail, isPass)
      .then((userCredential) => {
        localStorage.setItem("username", userCredential.user.email);
        navigate("/home");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login_page">
      <form action="/home" className="form">
        <div className="logo_user">
          <div className="bubbles">
            <Blank />
          </div>

          <img src=".\src\assets\user_login.png" alt="" />
          <h1>Log in</h1>
        </div>
        <div className="login_page_q">
          <div className="login_page_p">
            <label htmlFor="emailInp" className="label_login">
              Your Email
            </label>
            <input
              style={{ color: "black" }}
              type="email"
              placeholder="Username"
              className="input_login"
              id="emailInput"
              value={isEmail}
              onChange={handleEmail}
            />
          </div>
          <div className="login_page_p">
            <label htmlFor="password" className="label_login">
              Password
            </label>
            <input
              style={{ color: "black" }}
              type="password"
              placeholder="Password"
              className="input_login"
              id="passwordInput"
              value={isPass}
              onChange={handlePass}
            />
          </div>
          <div className="additionalInfo">
            <div>
              <input type="checkbox" name="" id="Remember Me" />
              <label htmlFor="Remember Me"> Remember Me</label>
            </div>
          </div>
          <button type="Submit" className="Submit" onClick={SignInUser}>
            {/* <Link to="../Home"> */}
            Login
            {/* </Link> */}
          </button>
          <div className="additionalInfo">
            <span>
              New Here? <Link to="../Register">Create an Account</Link>
            </span>
          </div>
        </div>
        <Footer />
      </form>
    </div>
  );
};

export default Login;
