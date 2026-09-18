import { useEffect, useState } from "react";
import axios from "axios";

function Inventory() {

  const [inventory, setInventory] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);

  const role = localStorage.getItem("role");

  const [formData, setFormData] = useState({
    id: "",
    productId: "",
    quantity: "",
    warehouseLocation: ""
  });

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {

    const response = await axios.get(
      "http://localhost:8080/inventory"
    );

    setInventory(response.data);
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addInventory = async () => {

    await axios.post(
      "http://localhost:8080/inventory",
      {
        productId: formData.productId,
        quantity: formData.quantity,
        warehouseLocation:
          formData.warehouseLocation
      }
    );

    setShowForm(false);

    setFormData({
      id: "",
      productId: "",
      quantity: "",
      warehouseLocation: ""
    });

    loadInventory();
  };

  const editInventory = (item) => {

    setEditing(true);
    setShowForm(true);
    setFormData(item);
  };

  const updateInventory = async () => {

    await axios.put(
      `http://localhost:8080/inventory/${formData.id}`,
      formData
    );

    setEditing(false);
    setShowForm(false);

    setFormData({
      id: "",
      productId: "",
      quantity: "",
      warehouseLocation: ""
    });

    loadInventory();
  };

  const deleteInventory = async (id) => {

    if (!window.confirm(
      "Delete this inventory record?"
    )) {
      return;
    }

    await axios.delete(
      `http://localhost:8080/inventory/${id}`
    );

    loadInventory();
  };

  return (

    <div className="page">

      <h1>Inventory Management</h1>

      <div className="report-card">

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px"
          }}
        >

          <h2>Inventory Records</h2>

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
                  warehouseLocation: ""
                });

                setShowForm(true);
              }}
            >
              + Add Inventory
            </button>

          )}

        </div>

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Product ID</th>
              <th>Quantity</th>
              <th>Location</th>

              {role === "ADMIN" &&
                <th>Actions</th>
              }

            </tr>

          </thead>

  <tbody>

  {inventory.length === 0 ? (

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
        No Inventory Records Available
      </td>

    </tr>

  ) : (

    inventory.map((item) => (

      <tr key={item.id}>

        <td>{item.id}</td>

        <td>{item.productId}</td>

        <td>{item.quantity}</td>

        <td>{item.warehouseLocation}</td>

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
                editInventory(item)
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
                deleteInventory(item.id)
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
              "0 0 15px rgba(0,0,0,0.3)"
          }}
        >

          <h2>
            {editing
              ? "Edit Inventory"
              : "Add Inventory"}
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

          <input
            type="text"
            name="warehouseLocation"
            placeholder="Warehouse Location"
            value={formData.warehouseLocation}
            onChange={handleChange}
          />

          <br /><br />

          <button
            onClick={
              editing
                ? updateInventory
                : addInventory
            }
          >
            {editing ? "Update" : "Save"}
          </button>

          <button
            style={{
              marginLeft: "10px"
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

export default Inventory;