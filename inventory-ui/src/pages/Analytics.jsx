import { useEffect, useState } from "react";
import axios from "axios";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

function Analytics() {

  const [stats, setStats] = useState({
  products: 0,
  orders: 0,
  inventoryRecords: 0,
  users: 0
});

const [lowStock, setLowStock] = useState([]);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {

  const statsRes = await axios.get(
    "http://localhost:8080/api/dashboard/stats"
  );

  const lowStockRes = await axios.get(
    "http://localhost:8080/api/dashboard/low-stock"
  );

  setStats(statsRes.data);
  setLowStock(lowStockRes.data);
};

  const businessData = [
  {
    name: "Products",
    value: stats.products
  },
  {
    name: "Orders",
    value: stats.orders
  },
  {
    name: "Inventory",
    value: stats.inventoryRecords
  },
  {
    name: "Users",
    value: stats.users
  }
];

const lowStockData =
  lowStock.map(item => ({
    name: "P" + item.productId,
    quantity: item.quantity
  }));

 

  return (
    <div className="page-container">

      <h1>Analytics Dashboard</h1>

      <div className="analytics-grid">

        <div className="chart-card">

          <h3>Business Overview</h3>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <BarChart data={businessData}>

  <CartesianGrid
    strokeDasharray="3 3"
  />

  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />

  <Bar
    dataKey="value"
    fill="#2563eb"
    barSize={20}
    radius={[8,8,0,0]}
  />

</BarChart>
          </ResponsiveContainer>

        </div>

        <div className="chart-card">

  <h3>Low Stock Alert</h3>

  <ResponsiveContainer
    width="100%"
    height={350}
  >
   <BarChart data={lowStockData}>

  <CartesianGrid strokeDasharray="3 3" />

  <XAxis dataKey="name" />
  <YAxis />
  <Tooltip />

  <Bar
    dataKey="quantity"
    fill="#dc2626"
    barSize={25}
    radius={[8,8,0,0]}
  />

</BarChart>
  </ResponsiveContainer>

</div>

      </div>

    </div>
  );
}

export default Analytics;