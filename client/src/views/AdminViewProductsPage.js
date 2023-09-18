import "./AdminViewProductsPage.css";
import EditProductModal from "../components/EditProductModal";
import Navbar from "../components/Navbar";
import { useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

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

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product);
    Axios.delete(`http://localhost:3001/products/${product.product_id}`)
      .then(() => {
        console.log("success");
        Swal.fire("Product deleted successfully");
      })
      .catch((err) => {
        console.log(err);
        Swal.fire("Error deleting product");
      });
    getProducts();
  };

  return (
    <div className="AdminViewProductsPage">
      <Navbar />
      <div className="products">
        <button onClick={getProducts}>Refresh Products</button>
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
                <button onClick={() => handleDeleteProduct(prod)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        {isModalOpen && (
          <EditProductModal
            product={selectedProduct}
            closeModal={() => setIsModalOpen(false)}
            refreshProducts={setProductsList}
          />
        )}
      </div>
    </div>
  );
}

export default AdminViewProductsPage;
