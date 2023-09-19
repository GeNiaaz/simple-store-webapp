import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./AddProductModal.css";
import { ValidateInput } from "../utils/Validation";
import Axios from "axios";
import Swal from "sweetalert2";

const AddProductModal = ({ closeAddProductModal, refreshProducts }) => {
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState(0);
  const [Description, setDescription] = useState("");
  const [Stock_Quantity, setStockQuantity] = useState(0);
  const [Category, setCategory] = useState("");

  const getProducts = (p) => {
    Axios.get("http://localhost:3001/products").then((response) => {
      p(response.data);
    });
  };

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
          Swal.fire("Product added successfully");
          getProducts(refreshProducts);
          closeAddProductModal();
        })
        .catch((err) => {
          console.log(err);
          Swal.fire("Error adding product");
        });
      getProducts(refreshProducts);
      closeAddProductModal();
    }
  };

  return (
    <div className="AddProductModal">
      <div className="ProductInformation">
        <h2>Add Product</h2>

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
        <button onClick={closeAddProductModal}>Cancel</button>
      </div>
    </div>
  );
};

export default AddProductModal;
