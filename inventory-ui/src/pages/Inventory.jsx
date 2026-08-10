import { useEffect, useState } from "react";
import API from "../services/api";

function Inventory() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    API.get("/inventory")
      .then((res) => setInventory(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Inventory Details</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>Location</th>
          </tr>
        </thead>

        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.productId}</td>
              <td>{item.quantity}</td>
              <td>{item.warehouseLocation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Inventory;