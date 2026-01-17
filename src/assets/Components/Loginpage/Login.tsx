// src/components/Login.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";
import { useToast } from "../../hooks/useToast";
import { ToastContainer } from "../Toast/Toast";

interface User {
  fullName: string;
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { toasts, removeToast, success, error } = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      error("Please fix the errors in the form");
      return;
    }

    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
      const user = users.find((u) => u.email === email && u.password === password);

      if (user) {
        success(`Welcome back, ${user.fullName}!`);
        setTimeout(() => {
          navigate("/linkpage");
        }, 1000);
      } else {
        error("Invalid email or password");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <>
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <section id="loginSection">
        <div className="login-container">
          <h1>Welcome Back</h1>
          <p className="login-subtitle">Sign in to access your links</p>

          <form className="login-form" onSubmit={handleLogin} noValidate>
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

            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Signing in...
                </>
              ) : (
                "Log In"
              )}
            </button>
          </form>

          <p className="signup-link">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </section>
    </>
  );
};
