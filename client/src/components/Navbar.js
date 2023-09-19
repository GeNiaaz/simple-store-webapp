import { useRef } from "react";
import { IoLogIn } from "react-icons/io5";
import { IoStorefrontSharp } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import "./Navbar.css";

function Navbar() {
  const navRef = useRef();
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <header>
      <h2>Uncle Ishak's Store</h2>
      <nav ref={navRef}>
        {localStorage.getItem("token") ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <a href="/login">
            <button>Login</button>
          </a>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
