import { Route, Redirect } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";

const authenticateToken = async (setRes) => {
  const token = localStorage.getItem("token");
  let res = false;
  if (token) {
    Axios.get("http://localhost:3001/auth/authenticatetoken", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        console.log(response);

        setRes(true);
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  } else {
    return "Unauthorized";
  }
};

const PrivateRoute = ({ children, ...rest }) => {
  //   const [auth, setAuth] = useState(false);

  //   useEffect(() => {
  //     const checkAuth = async () => {
  //       const result = await authenticateToken();
  //       setAuth(result);
  //     };
  //     checkAuth();
  //   }, []);

  const [res, setRes] = useState(false);

  authenticateToken(setRes);

  const token = localStorage.getItem("token");

  return (
    <Route {...rest}>{token ? children : <Redirect to="/products" />}</Route>
  );
};

export default PrivateRoute;
