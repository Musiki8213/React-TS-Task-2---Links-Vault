import { Link } from "react-router-dom";
import "./Homepage.css";

export const Homepage = () => {
  return (
    <div>
      <nav>
        <img id="logoImg" src="/logoImg.png" alt="Link Logo" />
        <ul>
          <div  style={{ display: "flex", flexDirection: "column", width: "80px" }}>
            <li>
              <div id="aboutDiv"  style={{ marginLeft: "20px" }}>
                <img id="aboutIcon" src="/aboutlogo.png" alt="about" />
              </div>
              <div>
                <Link to="/about">About</Link>
              </div>
            </li>
          </div>

          <div id="LoginDiv"  style={{ display: "flex", flexDirection: "column", width: "80px" }}>
            <li>
              <div style={{ marginLeft: "7px" }}>
                <img id="loginIcon" src="/loginlogo.png" alt="login" />
              </div>
              <div>
                <Link to="/login">Login</Link>
              </div>
            </li>
          </div>

          <div id="signupDiv"  style={{ display: "flex", flexDirection: "column", width: "80px" }}>
            <li>
              <div style={{ marginLeft: "20px" }}>
                <img id="signupIcon" src="/736545-200.png" alt="signup" />
              </div>
              <div>
                <Link to="/signup">Sign Up</Link>
              </div>
            </li>
          </div>
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
