import { Link } from "react-router-dom";
import Footer from "./Footer.jsx";
import Blank from "./components/Blank.jsx";

const Login = () => {
  return (
    <div>
      <div className="login_page">
        <form action="" className="form">
          <div className="logo_user">
            <div className="bubbles">
              <Blank />
            </div>

            <img src=".\src\assets\user_login.png" alt="" />
            <h1>Log in</h1>
          </div>
          <div className="login_page_q">
            <div className="login_page_p">
              <label htmlFor="name" className="label_login">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Username"
                className="input_login"
                id="name"
              />
            </div>
            <div className="login_page_p">
              <label htmlFor="password" className="label_login">
                Password
              </label>
              <input
                type="password"
                placeholder="Password"
                className="input_login"
                id="password"
              />
            </div>
            <div className="additionalInfo">
              <div>
                <input type="checkbox" name="" id="Remember Me" />
                <label htmlFor="Remember Me"> Remember Me</label>
              </div>
            </div>
            <button type="Submit" className="Submit">
              <Link to="../Home">Login</Link>
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
    </div>
  );
};

export default Login;
