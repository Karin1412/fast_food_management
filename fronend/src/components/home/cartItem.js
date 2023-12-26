// src/components/CartItem.js
import React from 'react';

const CartItem = ({ product, onIncrease, onDecrease, onRemove }) => {
  return (
    <div className="border p-4 mb-2">
      <div className="flex justify-between items-center">
        <div>
          <span className="block font-bold">{product.name}</span>
          <span className="block text-gray-500">${product.price}</span>
        </div>
        <div className="flex items-center">
          <button className="bg-blue-500 text-white py-1 px-2 rounded mr-2" onClick={() => onDecrease(product)}>
            -
          </button>
          <span>{product.quantity}</span>
          <button className="bg-blue-500 text-white py-1 px-2 rounded ml-2" onClick={() => onIncrease(product)}>
            +
          </button>
        </div>
        <button className="bg-red-500 text-white py-1 px-2 rounded" onClick={() => onRemove(product)}>
          Xóa
        </button>
      </div>
    </div>
  );
};

export default CartItem;
