import "./LoginPage.css";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";

function LoginPage(props) {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  //   const [token, setToken] = useState("");
  const history = useHistory();
  const handleLogin = () => {
    if (Username === "" || Password === "") {
      Swal.fire("Please enter a username and password");
      return;
    }

    Axios.post("http://localhost:3001/auth/login", {
      username: Username,
      password: Password,
    })
      .then((response) => {
        // setToken(response.data.accessToken);
        localStorage.setItem("token", response.data.accessToken);
        window.location.href = "/edit";
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Incorrect username or password");
      });
  };

  return (
    <div className="LoginPage">
      <div className="LoginInformation">
        <h2>Login</h2>
        <label>Username:</label>
        <input
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label>Password:</label>
        <input
          type="text"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button onClick={handleLogin}>Login</button>
        <br></br>
        <br></br>
        <a href="/products">
          <p>Changed you mind? Return home</p>
        </a>
      </div>
    </div>
  );
}

export default LoginPage;
