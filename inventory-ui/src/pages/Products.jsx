import { useEffect, useState } from "react";
import axios from "axios";

function Products() {

  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(false);

  const role = localStorage.getItem("role");

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    category: "",
    price: ""
  });

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {

    const response = await axios.get(
      "http://localhost:8080/products"
    );

    setProducts(response.data);
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const addProduct = async () => {

    await axios.post(
      "http://localhost:8080/products",
      {
        name: formData.name,
        category: formData.category,
        price: formData.price
      }
    );

    setShowForm(false);

    setFormData({
      id: "",
      name: "",
      category: "",
      price: ""
    });

    loadProducts();
  };

  const editProduct = (product) => {

    setEditing(true);
    setShowForm(true);
    setFormData(product);
  };

  const updateProduct = async () => {

    await axios.put(
      `http://localhost:8080/products/${formData.id}`,
      formData
    );

    setEditing(false);
    setShowForm(false);

    setFormData({
      id: "",
      name: "",
      category: "",
      price: ""
    });

    loadProducts();
  };

  const deleteProduct = async (id) => {

    if (!window.confirm("Delete this product?")) {
      return;
    }

    await axios.delete(
      `http://localhost:8080/products/${id}`
    );

    loadProducts();
  };

  return (

    <div className="page">

      <h1>Products Management</h1>

      <div className="report-card">

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px"
          }}
        >

          <h2>All Products</h2>

          {role === "ADMIN" && (

            <button
              style={{
                background: "#16a34a",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600"
              }}
              onClick={() => {

                setEditing(false);

                setFormData({
                  id: "",
                  name: "",
                  category: "",
                  price: ""
                });

                setShowForm(true);
              }}
            >
              + Add Product
            </button>

          )}

        </div>

        <table>

          <thead>

            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>

              {role === "ADMIN" &&
                <th>Actions</th>
              }

            </tr>

          </thead>

         <tbody>

  {products.length === 0 ? (

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
        No Products Available
      </td>

    </tr>

  ) : (

    products.map((product) => (

      <tr key={product.id}>

        <td>{product.id}</td>

        <td>{product.name}</td>

        <td>{product.category}</td>

        <td>₹ {product.price}</td>

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
                editProduct(product)
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
                deleteProduct(product.id)
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
            left: "38%",
            width: "350px",
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 0 20px rgba(0,0,0,0.3)",
            zIndex: "1000"
          }}
        >

          <h2>
            {editing
              ? "Edit Product"
              : "Add Product"}
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px"
            }}
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "12px"
            }}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "15px"
            }}
          />

          {editing ? (

            <button
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px"
              }}
              onClick={updateProduct}
            >
              Update
            </button>

          ) : (

            <button
              style={{
                background: "#16a34a",
                color: "white",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px"
              }}
              onClick={addProduct}
            >
              Save
            </button>

          )}

          <button
            style={{
              marginLeft: "10px",
              padding: "10px 18px",
              borderRadius: "8px"
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

export default Products;