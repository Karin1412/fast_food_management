// src/components/CheckoutArea.js
import React from 'react';
import CartItem from './cartItem';

const CheckoutArea = ({ selectedProducts, onIncrease, onDecrease, onRemove, onCheckout }) => {
  const subtotal = selectedProducts.reduce((total, product) => total + product.price * product.quantity, 0);

  const handleIncrease = (product) => {
    onIncrease(product);
  };

  const handleDecrease = (product) => {
    onDecrease(product);
  };

  const handleRemove = (product) => {
    onRemove(product);
  };
  const handleCheckout = () => {
    // Call the onCheckout prop when the "Thanh toán" button is clicked
    onCheckout();
  };
  return (
    <div className="overflow-y-auto">
      <h3 className="text-lg font-bold mb-4">Giỏ hàng</h3>
      {selectedProducts.length > 0 ? (
        <div>
          {selectedProducts.map(product => (
            <CartItem
              key={product.id}
              product={product}
              onIncrease={() => handleIncrease(product)}
              onDecrease={() => handleDecrease(product)}
              onRemove={() => handleRemove(product)}
            />
          ))}
          <div className="mt-4">
            <p className="font-bold">Tổng cộng: ${subtotal.toFixed(2)}</p>
            <button className="bg-blue-500 text-white py-2 px-4 mt-2 rounded hover:bg-blue-700" onClick={handleCheckout}>
              Thanh toán
            </button>
          </div>
        </div>
      ) : (
        <p>Chưa có sản phẩm trong giỏ hàng.</p>
      )}
    </div>
  );
};

export default CheckoutArea;
