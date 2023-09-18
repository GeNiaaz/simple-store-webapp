import { useRef } from "react";
import { IoLogIn } from "react-icons/io5";
import { IoStorefrontSharp } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import "./Navbar.css";

function Navbar() {
  const navRef = useRef();

  return (
    <header>
      <h3>Uncle Ben's Store</h3>
      <nav ref={navRef}>
        <a href="/products">
          <IoStorefrontSharp></IoStorefrontSharp> Products
        </a>
        <a href="/">
          <IoLogIn></IoLogIn> Login
        </a>
        <a href="/#">
          <IoLogOut></IoLogOut> Logout
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
