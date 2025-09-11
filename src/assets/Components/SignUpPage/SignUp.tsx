// src/components/SignUp.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

interface User {
  fullName: string;
  email: string;
  password: string;
}

export const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!fullName || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    // Save user to localStorage (MVP)
    const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
    users.push({ fullName, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful!");
    navigate("/login"); // Redirect to login page
  };

  return (
    <section id="signUpSection">
      <div className="signup-container">
        <h1 id="h1Signup">Get Started</h1>

        <form className="signup-form" onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="signup-btn">
            Sign Up
          </button>
        </form>

        <p className="signin-link">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </section>
  );
};
