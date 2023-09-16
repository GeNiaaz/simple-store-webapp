import { Route, Routes, Switch, Router, BrowserRouter } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./AddProductPage.css";

function AddProductPage(props) {
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState(0);
  const [Description, setDescription] = useState("");
  const [Quantity, setQuantity] = useState(0);

  const handleAddProduct = () => {
    console.log(Name);
    console.log(Price);
    console.log(Description);
    console.log(Quantity);
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
            setQuantity(event.target.value);
          }}
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
    </div>
  );
}

export default AddProductPage;
