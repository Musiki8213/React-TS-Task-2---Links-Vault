import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Homepage } from './assets/Components/Homepage/Homepage';
import { SignUp } from './assets/Components/SignUpPage/SignUp';    
import { Login } from './assets/Components/Loginpage/Login';   
import { About } from './assets/Components/Aboutpage/About';     
import { LinkPage } from './assets/Components/Linkpage/LinkPage';
import LinkOutcome from './assets/Components/LinkOutcome/LinkOutcome';

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Pages */}
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />

        {/* Links Pages */}
        <Route path="/linkpage" element={<LinkPage />} />       
        <Route path="/linkoutcome" element={<LinkOutcome />} /> 
      </Routes>
    </Router>
  );
}

export default App;
