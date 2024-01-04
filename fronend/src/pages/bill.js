// src/pages/InvoicePage.js
import React, { useState } from 'react';
import Header from '../components/header';
import '../style/bill.css';

const InvoicePage = () => {
  const [invoices] = useState([
    { code: 'HD001', productName: 'Sản phẩm A', quantity: 2, price: 100, date: new Date('2023-01-15') },
    { code: 'HD002', productName: 'Sản phẩm B', quantity: 1, price: 150, date: new Date('2023-02-20') },
    { code: 'HD003', productName: 'Sản phẩm C', quantity: 3, price: 200, date: new Date('2023-02-25') },
    // ... (Thêm hóa đơn khác)
  ]);

  const [searchCode, setSearchCode] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Số lượng sản phẩm hiển thị trên mỗi trang
  const productsPerPage = 7;

  // Lọc danh sách hóa đơn dựa trên mã hóa đơn, tháng và năm
  const filteredInvoices = invoices.filter((invoice) => {
    const codeMatch = invoice.code.toLowerCase().includes(searchCode.toLowerCase());
    const monthMatch = filterMonth === '' || invoice.date.getMonth() + 1 === parseInt(filterMonth, 10);
    const yearMatch = filterYear === '' || invoice.date.getFullYear() === parseInt(filterYear, 10);
    return codeMatch && monthMatch && yearMatch;
  });

  // Tính toán số lượng trang
  const totalPages = Math.ceil(filteredInvoices.length / productsPerPage);

  // Lấy danh sách hóa đơn cho trang hiện tại
  const currentInvoices = filteredInvoices.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  // Hàm xử lý sự kiện khi click vào nút "Previous Page"
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Hàm xử lý sự kiện khi click vào nút "Next Page"
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="invoice-page">
      {/* Header */}
      <Header />

      {/* Nội dung trang hóa đơn */}
      <div className="invoice-content">
        <h1 className="text-2xl font-bold mb-4">Quản lý hóa đơn</h1>

        {/* Ô tìm kiếm theo mã hóa đơn */}
        <div className="mb-2">
          <input
            type="text"
            placeholder="Nhập mã hóa đơn..."
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            className="border border-gray-400 px-2 py-1 mr-2"
          />
        </div>

        {/* Filter theo tháng và năm */}
        <div className="mb-2">
          <div className="flex items-center">
            <span className="mr-2">Tháng:</span>
            <input
              type="text"
              placeholder="Nhập tháng..."
              value={filterMonth}
              onChange={(e) => setFilterMonth(e.target.value)}
              className="border border-gray-400 px-2 py-1 mr-2"
            />
          </div>
          <div className="flex items-center">
            <span className="mr-2">Năm:</span>
            <input
              type="text"
              placeholder="Nhập năm..."
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="border border-gray-400 px-2 py-1"
            />
          </div>
        </div>

        {/* Bảng hóa đơn */}
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Mã Hóa Đơn</th>
              <th>Tên Sản Phẩm</th>
              <th>Số Lượng</th>
              <th>Giá Tiền</th>
              <th>Ngày</th>
            </tr>
          </thead>
          <tbody>
            {currentInvoices.map((invoice, index) => (
              <tr key={index}>
                <td>{invoice.code}</td>
                <td>{invoice.productName}</td>
                <td>{invoice.quantity}</td>
                <td>{invoice.price}</td>
                <td>{invoice.date.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Phân trang */}
        <div className="mt-4 flex justify-end">
          <div>
            <button
              className="bg-blue-500 text-white px-4 py-1 ml-2"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              Previous Page
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-1 ml-2"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoicePage;
