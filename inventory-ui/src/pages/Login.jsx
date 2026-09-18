import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./Login.css";

function Login() {

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response =
        await axios.post(
          "http://localhost:8080/auth/login",
          {
            username,
            password
          }
        );

      if (
        response.data.success === true
      ) {

        localStorage.setItem(
          "loggedIn",
          "true"
        );

        localStorage.setItem(
          "username",
          response.data.username
        );

        localStorage.setItem(
          "role",
          response.data.role
        );

        localStorage.setItem(
          "sessionStart",
          Date.now()
        );

        window.location.href =
          "/dashboard";

      } else {

        alert(
          "Invalid Username or Password"
        );

      }

    } catch (error) {

      console.error(error);

      alert(
        "Unable to connect to server"
      );

    }

  };

  return (

    <div className="login-container">

      <div className="login-left">

        <div className="login-box">

          <h1>CloudInventory</h1>

          <p className="subtitle">
            Smart Inventory Management Platform
          </p>

          <form onSubmit={handleLogin}>

            <label>
              Username
            </label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
            />

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
            />

            <button type="submit">
              Sign In
            </button>

          </form>

          <p className="register-text">

            New Employee?

            <Link
              to="/register"
              className="register-link"
            >
              Register Here
            </Link>

          </p>

        </div>

      </div>

      <div className="login-right">

        <div className="info-content">

          <h2>
            Smart Inventory
            <br />
            Management Platform
          </h2>

          <p>
            Manage your warehouse operations
            from one centralized dashboard.
          </p>

          <ul>

            <li>
              ✓ Product Management
            </li>

            <li>
              ✓ Inventory Tracking
            </li>

            <li>
              ✓ Order Processing
            </li>

            <li>
              ✓ Analytics Dashboard
            </li>

            <li>
              ✓ Reports & Export
            </li>

          </ul>

        </div>

      </div>

    </div>

  );
}

export default Login;