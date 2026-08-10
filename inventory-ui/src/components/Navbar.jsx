import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{
      background:"#1976d2",
      padding:"15px"
    }}>
      <Link to="/" style={{color:"white",marginRight:"20px"}}>
        Dashboard
      </Link>

      <Link to="/products" style={{color:"white",marginRight:"20px"}}>
        Products
      </Link>

      <Link to="/orders" style={{color:"white",marginRight:"20px"}}>
        Orders
      </Link>

      <Link to="/inventory" style={{color:"white"}}>
        Inventory
      </Link>
    </div>
  );
}

export default Navbar;