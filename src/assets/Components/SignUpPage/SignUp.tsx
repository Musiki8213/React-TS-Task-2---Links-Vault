// src/components/SignUp.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useToast } from "../../hooks/useToast";
import { ToastContainer } from "../Toast/Toast";

interface User {
  fullName: string;
  email: string;
  password: string;
}

export const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { toasts, removeToast, success, error } = useToast();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { fullName?: string; email?: string; password?: string } = {};
    
    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = "Full name must be at least 2 characters";
    }
    
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
      
      // Check if email already exists
      if (users.some(u => u.email === email)) {
        error("Email already registered. Please use a different email.");
        setIsLoading(false);
        return;
      }

      // Save user to localStorage
      users.push({ fullName, email, password });
      localStorage.setItem("users", JSON.stringify(users));

      success("Signup successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }, 800);
  };

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <section id="signUpSection">
        <div className="signup-container">
          <h1 id="h1Signup">Get Started</h1>
          <p className="signup-subtitle">Create your account to start saving links</p>

          <form className="signup-form" onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                }}
                className={errors.fullName ? "input-error" : ""}
                required
              />
              {errors.fullName && <span className="error-message">{errors.fullName}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                className={errors.email ? "input-error" : ""}
                required
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: undefined });
                }}
                className={errors.password ? "input-error" : ""}
                required
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <button type="submit" className="signup-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Creating account...
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          <p className="signin-link">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </div>
      </section>
    </>
  );
};
