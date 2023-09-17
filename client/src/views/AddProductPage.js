import { Route, Routes, Switch, Router, BrowserRouter } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./AddProductPage.css";
import { ValidateInput } from "../utils/Validation";
import Axios from "axios";

function AddProductPage(props) {
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState(0);
  const [Description, setDescription] = useState("");
  const [Stock_Quantity, setStockQuantity] = useState(0);
  const [Category, setCategory] = useState("");

  const handleAddProduct = () => {
    const prod = {
      name: Name,
      description: Description,
      price: Price,
      category: Category,
      stock_quantity: Stock_Quantity,
    };
    if (ValidateInput(prod)) {
      Axios.post("http://localhost:3001/products", {
        name: Name,
        price: Price,
        description: Description,
        stock_quantity: Stock_Quantity,
        category: Category,
      })
        .then(() => {
          console.log("success");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="AddProductPage">
      <div className="ProductInformation">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Price:</label>
        <input
          type="number"
          onChange={(event) => {
            setPrice(event.target.value);
          }}
        />
        <label>Description:</label>
        <input
          type="text"
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
        <label>Quantity:</label>
        <input
          type="number"
          onChange={(event) => {
            setStockQuantity(event.target.value);
          }}
        />
        <label>Category:</label>
        <input
          type="text"
          onChange={(event) => {
            setCategory(event.target.value);
          }}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
  );
}

export default AddProductPage;
