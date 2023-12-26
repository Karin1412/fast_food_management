// src/components/Product.js
import React from 'react';

const Product = ({ product, onSelect }) => {
  return (
    <div className="border p-4 cursor-pointer" onClick={() => onSelect(product)}>
      <span className="block font-bold">{product.name}</span>
      <span className="block mt-2">${product.price}</span>
    </div>
  );
};

export default Product;
