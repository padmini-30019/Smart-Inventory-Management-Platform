import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Register() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const register = async (e) => {

    e.preventDefault();

    if (password !== confirmPassword) {

      alert(
        "Passwords do not match"
      );

      return;
    }

    try {

      const response =
        await axios.post(
          "http://localhost:8080/auth/register",
          {
            username,
            password
          }
        );

      if (
        response.data.success
      ) {

        alert(
          "Registration Successful"
        );

        navigate("/");

      } else {

        alert(
          response.data.message
        );

      }

    } catch {

      alert(
        "Server Error"
      );

    }

  };

  return (

    <div className="login-container">

      <div className="login-left">

        <div className="login-box">

          <h1>Create Account</h1>

          <p className="subtitle">
            Register to access CloudInventory
          </p>

          <form onSubmit={register}>

            <label>Username</label>

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

            <label>Password</label>

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

            <label>Confirm Password</label>

            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
            />

            <button
              type="submit"
            >
              Register
            </button>

          </form>

          <p className="register-text">

            Already have an account?

            <Link
              to="/"
              className="register-link"
            >
              Login Here
            </Link>

          </p>

        </div>

      </div>

      <div className="login-right">

        <div className="info-content">

          <h2>
            Cloud Inventory
            <br />
            Management
          </h2>

          <p>
            Register and start managing
            products, inventory,
            orders and reports from
            one centralized platform.
          </p>

          <ul>
            <li>✓ Product Management</li>
            <li>✓ Inventory Tracking</li>
            <li>✓ Order Monitoring</li>
            <li>✓ Analytics Dashboard</li>
            <li>✓ Excel & PDF Reports</li>
          </ul>

        </div>

      </div>

    </div>

  );
}

export default Register;