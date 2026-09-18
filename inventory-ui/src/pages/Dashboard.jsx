import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {

  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    inventoryRecords: 0,
    users: 0,
    status: "Offline"
  });

  useEffect(() => {

    loadDashboard();

    const interval = setInterval(() => {
      loadDashboard();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const loadDashboard = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/api/dashboard/stats"
      );

      setStats(response.data);

    } catch (error) {

      console.error(error);

      setStats({
        products: 0,
        orders: 0,
        inventoryRecords: 0,
        users: 0,
        status: "Offline"
      });

    }

  };

  return (

    <div className="dashboard-container">

      <div className="dashboard-header">

        <h1>
          Smart Inventory Management Platform
        </h1>

        <p>
          Real-Time Warehouse Analytics Dashboard
        </p>

      </div>

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <h3>Total Products</h3>
          <h2>{stats.products}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Orders</h3>
          <h2>{stats.orders}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Inventory Records</h3>
          <h2>{stats.inventoryRecords}</h2>
        </div>

        <div className="dashboard-card">
          <h3>Total Users</h3>
          <h2>{stats.users}</h2>
        </div>

        <div className="dashboard-card">
          <h3>System Status</h3>

          <h2
            style={{
              color:
                stats.status === "Online"
                  ? "#22c55e"
                  : "#ef4444"
            }}
          >
            {stats.status}
          </h2>

        </div>

      </div>

    </div>

  );
}

export default Dashboard;