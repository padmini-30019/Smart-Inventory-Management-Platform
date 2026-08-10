import { useEffect, useState } from "react";
import API from "../services/api";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get("/orders")
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Orders</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td>{o.id}</td>
              <td>{o.productId}</td>
              <td>{o.quantity}</td>
              <td>{o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;