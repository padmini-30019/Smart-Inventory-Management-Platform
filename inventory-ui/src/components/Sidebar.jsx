import { Link } from "react-router-dom";
import { useEffect } from "react";
import "../styles/Sidebar.css";

function Sidebar() {

  const username =
    localStorage.getItem("username");

  const role =
    localStorage.getItem("role");

  useEffect(() => {

    const savedTheme =
      localStorage.getItem("theme") || "light";

    document.body.className =
      savedTheme;

  }, []);

  const toggleTheme = () => {

    const currentTheme =
      localStorage.getItem("theme") || "light";

    const newTheme =
      currentTheme === "light"
        ? "dark"
        : "light";

    localStorage.setItem(
      "theme",
      newTheme
    );

    document.body.className =
      newTheme;
  };

  const logout = () => {

    localStorage.clear();

    window.location.href = "/";
  };

  return (

    <div className="sidebar">

      <div className="logo">
        ☁️ CloudInventory
      </div>

      <div className="profile-card">

        <div className="profile-avatar">

          {username
            ?.charAt(0)
            .toUpperCase()}

        </div>

        <div className="profile-info">

          <h4>{username}</h4>

          <span>
            ({role})
          </span>

        </div>

      </div>

      <ul className="menu">

        <li>
          <Link to="/dashboard">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/products">
            Products
          </Link>
        </li>

        <li>
          <Link to="/orders">
            Orders
          </Link>
        </li>

        <li>
          <Link to="/inventory">
            Inventory
          </Link>
        </li>

        <li>
          <Link to="/analytics">
            Analytics
          </Link>
        </li>

        <li>
          <Link to="/reports">
            Reports
          </Link>
        </li>

        <li>
          <Link to="/profile">
            Profile
          </Link>
        </li>

        {role === "ADMIN" && (

          <li>
            <Link to="/users">
              Users
            </Link>
          </li>

        )}

      </ul>

      <div className="sidebar-footer">

        <button
          className="theme-btn"
          onClick={toggleTheme}
        >
          {localStorage.getItem("theme") === "dark"
            ? "☀ Light Mode"
            : "🌙 Dark Mode"}
        </button>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>

  );
}

export default Sidebar;