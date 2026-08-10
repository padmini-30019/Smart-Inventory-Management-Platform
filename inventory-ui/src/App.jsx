import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Inventory from "./pages/Inventory";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Products />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </>
  );
}

export default App;