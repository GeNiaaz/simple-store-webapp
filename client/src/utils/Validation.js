import Swal from "sweetalert2";

export function ValidateInput(editedProduct) {
  if (editedProduct.name === "") {
    Swal.fire("Please enter a valid name");
    return false;
  }
  if (editedProduct.price === "") {
    Swal.fire("Please enter a price");
    return false;
  } else {
    const numberString = editedProduct.price.toString();
    const parts = numberString.split(".");
    if (parts.length === 2) {
      if (parts[1].length > 2) {
        Swal.fire("Please enter a price with no more than 2 decimal places");
        return false;
      }
    }
  }
  if (editedProduct.description === "") {
    Swal.fire("Please enter a description");
    return false;
  }
  if (editedProduct.stock_quantity === "") {
    Swal.fire("Please enter a stock quantity");
    return false;
  }
  if (editedProduct.category === "") {
    Swal.fire("Please enter a category");
    return false;
  }
  return true;
}
