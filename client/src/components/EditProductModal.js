import React, { useState } from "react";
import "./EditProductModal.css";
import Axios from "axios";
import Swal from "sweetalert2";
import { ValidateInput } from "../utils/Validation";

const EditProductModal = ({ product, closeModal }) => {
  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(editedProduct);
    if (ValidateInput(editedProduct)) {
      Axios.put(`http://localhost:3001/products/${editedProduct.product_id}`, {
        ...editedProduct,
      })
        .then((response) => {
          if (response.status === 200) {
            console.log("product updated successfully");
            closeModal();
          } else {
            Swal.fire(`Response status: ${response.status}, please try again`);
            console.log("product update failed");
          }
        })
        .catch((err) => {
          Swal.fire("Product update failed, please try again");
          console.log(err);
        });

      closeModal();
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={editedProduct.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              name="price"
              value={editedProduct.price}
              onChange={handleChange}
            />
          </label>
          <label>
            Description:
            <textarea
              name="description"
              value={editedProduct.description}
              onChange={handleChange}
            />
          </label>
          <label>
            Stock Quantity:
            <input
              type="number"
              name="stock_quantity"
              value={editedProduct.stock_quantity}
              onChange={handleChange}
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              name="category"
              value={editedProduct.category}
              onChange={handleChange}
            />
          </label>
          {/* Add more fields for editing */}
          <button type="submit">Save</button>
          <button onClick={closeModal}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
