import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {

  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);

  const role = localStorage.getItem("role");

  const [formData, setFormData] = useState({
    id: "",
    productId: "",
    quantity: "",
    status: "PLACED"
  });

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {

    const response = await axios.get(
      "http://localhost:8080/orders"
    );

    setOrders(response.data);
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addOrder = async () => {

    await axios.post(
      "http://localhost:8080/orders",
      {
        productId: formData.productId,
        quantity: formData.quantity,
        status: formData.status
      }
    );

    setShowForm(false);

    setFormData({
      id: "",
      productId: "",
      quantity: "",
      status: "PLACED"
    });

    loadOrders();
  };

  const editOrder = (order) => {

    setEditing(true);
    setShowForm(true);
    setFormData(order);
  };

  const updateOrder = async () => {

    await axios.put(
      `http://localhost:8080/orders/${formData.id}`,
      formData
    );

    setEditing(false);
    setShowForm(false);

    setFormData({
      id: "",
      productId: "",
      quantity: "",
      status: "PLACED"
    });

    loadOrders();
  };

  const deleteOrder = async (id) => {

    if (!window.confirm("Delete this order?")) {
      return;
    }

    await axios.delete(
      `http://localhost:8080/orders/${id}`
    );

    loadOrders();
  };

  return (

    <div className="page">

      <h1>Orders Management</h1>

      <div className="report-card">

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px"
          }}
        >

          <h2>All Orders</h2>

          {role === "ADMIN" && (

            <button
              style={{
                background: "#16a34a",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "600"
              }}
              onClick={() => {

                setEditing(false);

                setFormData({
                  id: "",
                  productId: "",
                  quantity: "",
                  status: "PLACED"
                });

                setShowForm(true);
              }}
            >
              + Create Order
            </button>

          )}

        </div>

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Status</th>

              {role === "ADMIN" &&
                <th>Actions</th>
              }

            </tr>

          </thead>
<tbody>

  {orders.length === 0 ? (

    <tr>

      <td
        colSpan={role === "ADMIN" ? 5 : 4}
        style={{
          textAlign: "center",
          padding: "20px",
          color: "#6b7280",
          fontWeight: "600"
        }}
      >
        No Orders Available
      </td>

    </tr>

  ) : (

    orders.map((order) => (

      <tr key={order.id}>

        <td>{order.id}</td>

        <td>{order.productId}</td>

        <td>{order.quantity}</td>

        <td>{order.status}</td>

        {role === "ADMIN" && (

          <td>

            <button
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "8px 14px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600"
              }}
              onClick={() =>
                editOrder(order)
              }
            >
              Edit
            </button>

            <button
              style={{
                marginLeft: "10px",
                background: "#dc2626",
                color: "white",
                border: "none",
                padding: "8px 14px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600"
              }}
              onClick={() =>
                deleteOrder(order.id)
              }
            >
              Delete
            </button>

          </td>

        )}

      </tr>

    ))

  )}

</tbody>

        </table>

      </div>

      {showForm && (

        <div
          style={{
            position: "fixed",
            top: "20%",
            left: "40%",
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow:
              "0 0 15px rgba(0,0,0,0.3)",
            zIndex: 1000
          }}
        >

          <h2>
            {editing
              ? "Edit Order"
              : "Create Order"}
          </h2>

          <input
            type="number"
            name="productId"
            placeholder="Product ID"
            value={formData.productId}
            onChange={handleChange}
          />

          <br /><br />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
          />

          <br /><br />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="PLACED">PLACED</option>
            <option value="PROCESSING">PROCESSING</option>
            <option value="SHIPPED">SHIPPED</option>
            <option value="DELIVERED">DELIVERED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>

          <br /><br />

          <button
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600"
            }}
            onClick={
              editing
                ? updateOrder
                : addOrder
            }
          >
            {editing ? "Update" : "Save"}
          </button>

          <button
            style={{
              marginLeft: "10px",
              background: "#6b7280",
              color: "white",
              border: "none",
              padding: "10px 18px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600"
            }}
            onClick={() =>
              setShowForm(false)
            }
          >
            Cancel
          </button>

        </div>

      )}

    </div>
  );
}

export default Orders;