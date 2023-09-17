import "./ViewProductsPage.css";
import { useState } from "react";
import Axios from "axios";

function ViewProductsPage(props) {
  const [ProductsList, setProductsList] = useState([]);
  const getProducts = () => {
    Axios.get("http://localhost:3001/products").then((response) => {
      setProductsList(response.data);
    });
  };

  return (
    <div className="ViewProductsPage">
      <div className="products">
        <button onClick={getProducts}>Show Products</button>

        {ProductsList.map((val, key) => {
          return (
            <div className="product">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Price: ${val.price}</h3>
                <h3>Description: {val.description}</h3>
                <h3>Stock_Quantity: {val.stock_quantity}</h3>
                <h3>Category: {val.category}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ViewProductsPage;
