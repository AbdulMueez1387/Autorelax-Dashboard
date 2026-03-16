import React, { useState } from "react";
import "./Login.css";

const Login = () => {

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login Clicked");
  };

  return (
    <div className="login-container">

      <div className="login-image-section">
        <img src="/login.png" alt="Motor Oil" className="bg-image" />
      </div>


      {/* RIGHT FORM */}
      <div className="login-form-section">

        <div className="form-wrapper">

          {/* LOGO */}
          <div className="logo-container">
            <img src="/logo.png" alt="Auto Relax Logo" className="logo-img" />
            <h2 className="welcome-text">WELCOME BACK!</h2>
          </div>

          {/* FORM */}
          <form className="login-form" onSubmit={handleSubmit}>

            <div className="input-group">
              <label>Username</label>
              <input 
                type="text" 
                placeholder="Username/CNIC"
                required
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <div className="password-wrapper">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                />

                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁"}
                </span>

              </div>
            </div>

            {/* OPTIONS */}
            <div className="form-options">

              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>

              <a href="#" className="forgot-pass">
                Forgot password?
              </a>

            </div>

            {/* BUTTON */}
            <button type="submit" className="login-btn">
              Login
            </button>

            {/* DIVIDER */}
            <div className="divider">
              <span>or continue with</span>
            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Login;