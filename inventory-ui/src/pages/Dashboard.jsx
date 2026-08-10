import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Inventory Management Dashboard</h1>

      <h3>Available Modules</h3>

      <ul>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/orders">Orders</Link></li>
        <li><Link to="/inventory">Inventory</Link></li>
      </ul>
    </div>
  );
}

export default Dashboard;