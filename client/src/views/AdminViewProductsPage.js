import "./AdminViewProductsPage.css";
import EditProductModal from "../components/EditProductModal";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import Axios from "axios";
import Swal from "sweetalert2";
import AddProductModal from "./AddProductModal";
import { FaTimes, FaPencilAlt } from "react-icons/fa";

function AdminViewProductsPage(props) {
  const [ProductsList, setProductsList] = useState([]);
  const getProducts = () => {
    Axios.get("http://localhost:3001/products").then((response) => {
      setProductsList(response.data);
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  console.log(isAddProductModalOpen);

  const handleAddProduct = () => {
    setIsAddProductModalOpen(true);
  };

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product);
    Axios.delete(`http://localhost:3001/products/${product.product_id}`)
      .then(() => {
        console.log("success");
        Swal.fire("Product deleted successfully");
        getProducts();
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Error deleting product");
        getProducts();
      });
    getProducts();
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="AdminViewProductsPage">
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
                  <div
                    className="close-icon"
                    onClick={() => handleDeleteProduct(prod)}
                  >
                    <FaTimes />
                  </div>
                  <div
                    className="edit-icon"
                    onClick={() => handleEditProduct(prod)}
                  >
                    <FaPencilAlt />
                  </div>
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

        {isModalOpen && (
          <EditProductModal
            product={selectedProduct}
            closeModal={() => setIsModalOpen(false)}
            refreshProducts={setProductsList}
          />
        )}
        {isAddProductModalOpen && (
          <AddProductModal
            closeAddProductModal={() => setIsAddProductModalOpen(false)}
            refreshProducts={setProductsList}
          />
        )}
      </div>
      <button onClick={() => handleAddProduct()} className="add-button">
        +
      </button>
    </div>
  );
}

export default AdminViewProductsPage;
