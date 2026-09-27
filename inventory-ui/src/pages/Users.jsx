import API_BASE_URL from "../config";
import { useEffect, useState } from "react";
import axios from "axios";
import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/users/`
      );

      setUsers(response.data);
    } catch (error) {
      console.error("Load Users Error:", error);
      alert("Failed to load users");
    }
  };

  const changeRole = async (id, role) => {
    try {
      await axios.put(
        `${API_BASE_URL}/users/role/${id}/?role=${role}`
      );

      await loadUsers();
    } catch (error) {
      console.error("Role Update Error:", error);
      alert("Failed to update role");
    }
  };

  return (
    <div className="page">
      <h1>User Management</h1>

      <div className="report-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Current Role</th>
              <th>Change Role</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>

                  <td>{user.username}</td>

                  <td>
                    <span
                      className={
                        user.role === "ADMIN"
                          ? "role-admin"
                          : "role-user"
                      }
                    >
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <button
                      className={
                        user.role === "ADMIN"
                          ? "admin-btn"
                          : "user-btn"
                      }
                      onClick={() =>
                        changeRole(
                          user.id,
                          user.role === "ADMIN"
                            ? "USER"
                            : "ADMIN"
                        )
                      }
                    >
                      Change to{" "}
                      {user.role === "ADMIN"
                        ? "USER"
                        : "ADMIN"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;