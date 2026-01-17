import { Link } from "react-router-dom";
import "./Homepage.css";

export const Homepage = () => {
  return (
    <div>
      <nav>
        <img id="logoImg" src="/logoImg.png" alt="Link Logo" />
        <ul>
          <li>
            <Link to="/about" className="nav-link">
              <img id="aboutIcon" src="/aboutlogo.png" alt="about" />
              <span>About</span>
            </Link>
          </li>
          <li>
            <Link to="/login" className="nav-link">
              <img id="loginIcon" src="/loginlogo.png" alt="login" />
              <span>Login</span>
            </Link>
          </li>
          <li>
            <Link to="/signup" className="nav-link">
              <img id="signupIcon" src="/736545-200.png" alt="signup" />
              <span>Sign Up</span>
            </Link>
          </li>
        </ul>
      </nav>

      <section id="section">
        <div id="heading">
          <h1>
            Save Once.
            <br />
            Access Anywhere.
          </h1>

          <p>
            Easily save, organize, and access your
            <br />
            links from anywhere.
          </p>
          <br />
          <div id="flexBtn">
            <Link to="/signup">
              <button id="signBtn">Sign Up</button>
            </Link>
            <Link to="/login">
              <button id="signBtn">Sign In</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
