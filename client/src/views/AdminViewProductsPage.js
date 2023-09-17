import "./AdminViewProductsPage.css";
import EditProductModal from "../components/EditProductModal";
import { useState } from "react";
import Axios from "axios";

function AdminViewProductsPage(props) {
  const [ProductsList, setProductsList] = useState([]);
  const getProducts = () => {
    Axios.get("http://localhost:3001/products").then((response) => {
      setProductsList(response.data);
    });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  console.log(isModalOpen);

  return (
    <div className="AdminViewProductsPage">
      <div className="products">
        <button onClick={getProducts}>Show Products</button>
        {ProductsList.map((prod, key) => {
          return (
            <div className="product">
              <div>
                <h3>Name: {prod.name}</h3>
                <h3>Price: ${prod.price}</h3>
                <h3>Description: {prod.description}</h3>
                <h3>Stock_Quantity: {prod.stock_quantity}</h3>
                <h3>Category: {prod.category}</h3>
              </div>
              <div>
                <button onClick={() => handleEditProduct(prod)}>Edit</button>
                <button>Delete</button>
              </div>
            </div>
          );
        })}
        {isModalOpen && (
          <EditProductModal
            product={selectedProduct}
            closeModal={() => setIsModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}

export default AdminViewProductsPage;
