import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import Profile from "./pages/Profile";

function App() {

  const loggedIn =
    localStorage.getItem("loggedIn") === "true";

  if (!loggedIn) {

    return (

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>

    );
  }

  return (

    <div className="app-layout">

      <Sidebar />

      <div className="main-content">

        <Routes>

          <Route
            path="/"
            element={
              <Navigate
                to="/dashboard"
              />
            }
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/products"
            element={<Products />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
            path="/inventory"
            element={<Inventory />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/reports"
            element={<Reports />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/users"
            element={<Users />}
          />

          <Route
            path="*"
            element={
              <Navigate
                to="/dashboard"
              />
            }
          />

        </Routes>

      </div>

    </div>

  );
}

export default App;