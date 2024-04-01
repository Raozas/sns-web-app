import { Link } from "react-router-dom";
import Footer from "./Footer.jsx";

const Register = () => {
  <link rel="stylesheet" href="Register.css" />;
  return (
    <div className="sPage">
      <div className="signup_page">
        <form action="">
          <div className="bubbles">
            <div className="FE5D26" />
            <div className="F2C078" />
          </div>
          <h1>Sign up</h1>
          <div className="login_page_q">
            <div className="login_page_p">
              <label htmlFor="" className="label_login">
                Your Name
              </label>
              <input
                type="text"
                placeholder="Username"
                className="input_login"
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
              />
            </div>

            <button type="Submit" className="Submit">
              <Link to="../Home">Sign up</Link>
            </button>
            <div className="additionalInfo">
              <span>
                Already have an Account? <Link to="../Login">Login</Link>
              </span>
            </div>
          </div>
          <Footer />
        </form>
      </div>
    </div>
  );
};

export default Register;
