// src/components/home/Bill.js
import React from 'react';

const Bill = ({ selectedProducts, onCancel, onPrint }) => {
  const calculateTotal = () => {
    return selectedProducts.reduce((total, product) => total + product.price * product.quantity, 0);
  };

  return (
    <div className="bg-white p-6 rounded-md shadow-lg max-w-md mx-auto">
      <table className="w-full mb-4 border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Sản phẩm</th>
            <th className="py-2 px-4 border-b">Số lượng</th>
            <th className="py-2 px-4 border-b">Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {selectedProducts.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">{product.quantity}</td>
              <td className="py-2 px-4">${(product.price * product.quantity).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr className="my-2" />
      <p className="font-bold text-lg">Tổng cộng: ${calculateTotal().toFixed(2)}</p>
      <div className="mt-4 flex justify-end">
        <button
          onClick={onCancel}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 mr-2"
        >
          Hủy hóa đơn
        </button>
        <button
          onClick={onPrint}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          In hóa đơn
        </button>
      </div>
    </div>
  );
};

export default Bill;
