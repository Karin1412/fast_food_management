// src/pages/SalesPage.js
import React, { useState } from 'react';
import Header from '../components/header';
import ProductList from '../components/home/productList';
import CheckoutArea from '../components/home/checkoutArea';
import Bill from '../components/home/bill';

const SalesPage = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isCheckoutVisible, setCheckoutVisible] = useState(false);

  const handleProductSelect = (product) => {
    const existingProduct = selectedProducts.find((p) => p.id === product.id);

    if (existingProduct) {
      setSelectedProducts(
        selectedProducts.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
  };

  const handleIncrease = (product) => {
    setSelectedProducts(
      selectedProducts.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const handleDecrease = (product) => {
    if (product.quantity > 1) {
      setSelectedProducts(
        selectedProducts.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
        )
      );
    }
  };

  const handleRemove = (product) => {
    setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
  };

  const handleCheckout = () => {
    setCheckoutVisible(true);
  };

  const handleCancel = () => {
    setCheckoutVisible(false);
    // Thêm bất kỳ xử lý khác khi hủy hóa đơn, nếu cần
  };

  const handlePrint = () => {
    // Thêm xử lý in hóa đơn, nếu cần
  };
  return (
    <div className="flex h-screen">
      {/* Header */}
      <Header />

      {/* Danh sách sản phẩm */}
      <div className="flex-1 overflow-y-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Danh sách sản phẩm</h1>
        <ProductList onProductSelect={handleProductSelect} />
      </div>

      {/* Khu vực thanh toán */}
      <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Khu vực thanh toán</h2>
        <CheckoutArea
          selectedProducts={selectedProducts}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onRemove={handleRemove}
          onCheckout={handleCheckout}
        />
      </div>
       {/* Hiển thị Hóa đơn */}
       {isCheckoutVisible && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Hóa đơn</h2>
            <Bill
              selectedProducts={selectedProducts}
              onCancel={handleCancel}
              onPrint={handlePrint}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesPage;
