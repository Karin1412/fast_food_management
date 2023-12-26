// src/components/ProductForm.js
import React, {useState} from 'react';
import '../../style/product.css'

const ProductForm = ({ onClose, onProductAdd, existingProducts, onProductUpdate  }) => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productAmount, setProductAmount] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      if (productName && productPrice && productAmount) {
        const existingProduct = existingProducts.find(
          (product) => product.name.toLowerCase() === productName.toLowerCase()
        );
  
        if (existingProduct) {
          // If the product already exists, update its amount
          const updatedProduct = {
            ...existingProduct,
            amount: existingProduct.amount + Number(productAmount),
          };
  
          onProductUpdate(updatedProduct); // Remove the old product
          //onProductAdd(updatedProduct); // Add the updated product
        } else {
          // If the product does not exist, create a new product
          const newProduct = {
            id: Date.now(),
            name: productName,
            price: Number(productPrice),
            amount: Number(productAmount),
          };
  
          onProductAdd(newProduct);
        }
      }
    };
  
    return (
      <div className="product-form-overlay">
        <div className="product-form">
          <h2 className="text-xl font-bold mb-4">Thêm sản phẩm</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                Tên Sản phẩm
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                className="form-input"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
                Giá Sản phẩm
              </label>
              <input
                type="number"
                id="productPrice"
                name="productPrice"
                className="form-input"
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
                Số lượng
              </label>
              <input
                type="number"
                id="productAmount"
                name="productAmount"
                className="form-input"
                value={productAmount}
                onChange={(e) => setProductAmount(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button type="button" onClick={onClose} className="mr-2 text-black">
                Hủy
              </button>
              <button type="submit" className="bg-blue-500 text-white px-4 py-1">
                Thêm
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default ProductForm;