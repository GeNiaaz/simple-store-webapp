import { useRef } from "react";
import "./Navbar.css";

function Navbar() {
  const navRef = useRef();

  return (
    <header>
      <h3>Online Store</h3>
      <nav ref={navRef}>
        <a href="/products">Products</a>
        <a href="/edit">Admin</a>
        <a href="/add">Add Product</a>
        <a href="/#">Login</a>
      </nav>
    </header>
  );
}

export default Navbar;
