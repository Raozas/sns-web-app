import {Link} from "react-router-dom";
import Footer from "./Footer.jsx";
import {useState} from "react";
import {initializeApp} from "firebase/app";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const firebaseConfig = {
  apiKey: "AIzaSyDqjVhimh_ll8c0EYpNmI4qjuzmXUpGXBM",
  authDomain: "app1-6e8a7.firebaseapp.com",
  databaseURL: "https://app1-6e8a7-default-rtdb.firebaseio.com",
  projectId: "app1-6e8a7",
  storageBucket: "app1-6e8a7.appspot.com",
  messagingSenderId: "775303230727",
  appId: "1:775303230727:web:6a748bfbed8982382f41a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore();
const colRef = collection(db, "user");
onSnapshot(colRef, (snapshot) => {
  let users = [];
  snapshot.docs.forEach((doc) => {
    users.push({...doc.data(), id: doc.id});
  });
});

const Register = () => {
  const navigate = useNavigate();
  const [isEmail, setIsEmail] = useState("");
  const [isPassword, setIsPassword] = useState("");
  const signUpUser = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, isEmail, isPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }
  
  return (
    <div className="sPage">
      <div className="signup_page">
        <form id="mainForm" onSubmit={signUpUser}>
          <div className="bubbles">
            <div className="FE5D26"/>
            <div className="F2C078"/>
          </div>
          <h1 style={{ textAlign: "center"}}>Sign up</h1>
          <div className="login_page_q">
            <div className="login_page_p">
              <label htmlFor="" className="label_login">
                Your email
              </label>
              <input
                type="email"
                placeholder="Email"
                className="input_login"
                id="emailInp"
                value={isEmail}
                onChange={(e) => {
                  setIsEmail(e.target.value);
                }}
              />
            </div>
            <div className="login_page_p">
              <label htmlFor="" className="label_login">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input_login"
                id="passwordInp"
                value={isPassword}
                onChange={(e) => {
                  setIsPassword(e.target.value);
                }}
              />
            </div>
            <div className="login_page_p">
              <label htmlFor="" className="label_login">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input_login"
                id="confPasswordInp"
              />
            </div>
            
            <button type="Submit" className="Submit">
              {/*<Link to="../Home">*/}
                Sign up
              {/*</Link>*/}
            </button>
            <div className="additionalInfo">
              <span>
                Already have an Account? <Link to="../Login">Login</Link>
              </span>
            </div>
          </div>
          <Footer/>
        </form>
      </div>
    </div>
  );
};


export default Register;
