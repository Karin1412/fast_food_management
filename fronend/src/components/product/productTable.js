// src/components/ProductTable.js
import React from 'react';
import ProductItem from './productItem';

const ProductTable = ({ products, onDelete, onEdit }) => (
  <table className="table-auto w-full">
    <thead>
      <tr>
        <th className="border border-gray-400 py-2 px-4">ID</th>
        <th className="border border-gray-400 py-2 px-4">Tên sản phẩm</th>
        <th className="border border-gray-400 py-2 px-4">Giá</th>
        <th className="border border-gray-400 py-2 px-4">Số lượng</th>
        <th className="border border-gray-400 py-2 px-4">Thao tác</th>
      </tr>
    </thead>
    <tbody>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          id={product.id}
          name={product.name}
          price={product.price}
          amount={product.amount}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </tbody>
  </table>
);

export default ProductTable;
