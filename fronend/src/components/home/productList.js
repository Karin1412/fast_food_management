/// src/components/ProductList.js
import React from 'react';
import Product from './product';

const ProductList = ({ onProductSelect }) => {
  const products = [
    { id: 1, name: 'Product 1', price: 10.99 },
    { id: 2, name: 'Product 2', price: 19.99 },
    { id: 3, name: 'Product 3', price: 15.99 },
    { id: 4, name: 'Product 4', price: 12.99 },
    { id: 5, name: 'Product 5', price: 8.99 },
    { id: 6, name: 'Product 6', price: 12.99 },
    { id: 7, name: 'Product 7', price: 8.99 },
    // ... more products
  ];

  const handleProductSelect = (product) => {
    onProductSelect(product);
  };

  return (
    <div className="flex flex-wrap">
      {products.map(product => (
        <div key={product.id} className="w-1/2 md:w-1/3 lg:w-1/4 p-2">
          <Product product={product} onSelect={() => handleProductSelect(product)} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
