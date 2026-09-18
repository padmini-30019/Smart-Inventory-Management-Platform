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
        "http://localhost:8080/users"
      );

      setUsers(response.data);

    } catch (error) {

      console.error(error);
      alert("Failed to load users");

    }
  };

  const changeRole = async (id, role) => {

    try {

      await axios.put(
        `http://localhost:8080/users/role/${id}?role=${role}`
      );

      loadUsers();

    } catch (error) {

      console.error(error);
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

            {users.map((user) => (

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
                    Change to {" "}
                    {user.role === "ADMIN"
                      ? "USER"
                      : "ADMIN"}
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Users;