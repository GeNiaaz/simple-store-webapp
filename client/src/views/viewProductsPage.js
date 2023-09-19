import "./ViewProductsPage.css";
import { React, useState, useEffect } from "react";
import Axios from "axios";
import Navbar from "../components/Navbar";

function ViewProductsPage(props) {
  const [ProductsList, setProductsList] = useState([]);
  const getProducts = () => {
    Axios.get("http://localhost:3001/products").then((response) => {
      setProductsList(response.data);
    });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="ViewProductsPage">
      <Navbar />
      <div className="products">
        <div className="product-grid">
          {ProductsList.map((prod, key) => {
            if (prod.description.length > 90) {
              prod.description = prod.description.substring(0, 90) + "...";
            }
            return (
              <div className="product">
                <div className="product-card" key={key}>
                  <div className="product-header">
                    <h2>{prod.name}</h2>
                    <h2>${prod.price}</h2>
                  </div>
                  <div className="product-footer">
                    <mark>{prod.category}</mark>
                    <h3>Stocks: {prod.stock_quantity}</h3>
                  </div>
                  <div className="product-description">
                    <p>{prod.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ViewProductsPage;
