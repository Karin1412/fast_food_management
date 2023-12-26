// src/components/ProductItem.js
import React from 'react';

const ProductItem = ({ id, name, price, amount, onDelete, onEdit }) => {
  // Hàm xử lý sự kiện khi người dùng click vào nút "Sửa"
  const handleEditClick = () => {
    // Gọi hàm xử lý sự kiện từ props và truyền id của sản phẩm
    onEdit(id);
  };

  // Hàm xử lý sự kiện khi người dùng click vào nút "Xóa"
  const handleDeleteClick = () => {
    // Gọi hàm xử lý sự kiện từ props và truyền id của sản phẩm
    onDelete(id);
  };

  return (
    <tr>
      <td className="border border-gray-400 py-2 px-4 text-center">
        {id}
      </td>
      <td className="border border-gray-400 py-2 px-4">
        {name}
      </td>
      <td className="border border-gray-400 py-2 px-4">
        {price}
      </td>
      <td className="border border-gray-400 py-2 px-4">
        {amount}
      </td>
      <td className="border border-gray-400 py-2 px-4 text-center">
        {/* Gọi hàm xử lý sự kiện khi người dùng click vào nút "Sửa" */}
        <button className="bg-blue-500 text-white px-2 py-1" onClick={handleEditClick}>
          Sửa
        </button>
        {/* Gọi hàm xử lý sự kiện khi người dùng click vào nút "Xóa" */}
        <button className="bg-red-500 text-white px-2 py-1 ml-2" onClick={handleDeleteClick}>
          Xóa
        </button>
      </td>
    </tr>
  );
};

export default ProductItem;
