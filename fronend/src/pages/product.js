import React, { useState } from 'react';
import Header from '../components/header';
import ProductTable from '../components/product/productTable';
import ProductForm from '../components/product/productForm';
import '../style/product.css'

const ProductManagementPage = () => {
    const [products, setProducts] = useState([
      { id: 1, name: 'Sản phẩm A', price: 100 , amount: 100},
      { id: 2, name: 'Sản phẩm B', price: 150 , amount: 130},
      { id: 3, name: 'Sản phẩm C', price: 200 , amount: 130},
      { id: 4, name: 'Sản phẩm D', price: 100 , amount: 120},
      { id: 5, name: 'Sản phẩm E', price: 150 , amount: 110},
      { id: 6, name: 'Sản phẩm F', price: 200 , amount: 200},
      { id: 7, name: 'Sản phẩm G', price: 100 , amount: 130},
      { id: 8, name: 'Sản phẩm H', price: 150 , amount: 130},
      { id: 9, name: 'Sản phẩm I', price: 200 , amount: 130},
      { id: 10, name: 'Sản phẩm A', price: 100 , amount: 130},
      { id: 11, name: 'Sản phẩm B', price: 150 , amount: 130},
      { id: 12, name: 'Sản phẩm C', price: 200 , amount: 130},
      // ... (Thêm nhiều sản phẩm khác)
    ]);
  
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [successMessage, setSuccessMessage] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');
    const productsPerPage = 7; // Số lượng sản phẩm hiển thị trên mỗi trang
  
    // Hàm xử lý sự kiện sửa sản phẩm
    const handleEdit = (productId) => {
      // Hiện dialog hoặc thực hiện các thao tác cần thiết khi sửa sản phẩm
      console.log(`Sửa sản phẩm với ID: ${productId}`);
    };
  
    // Hàm xử lý sự kiện khi nhập từ khóa tìm kiếm
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
  
    // Lọc danh sách sản phẩm dựa trên từ khóa tìm kiếm
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    // Tính toán số lượng trang
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
    // Lấy danh sách sản phẩm cho trang hiện tại
    const currentProducts = filteredProducts.slice(
      (currentPage - 1) * productsPerPage,
      currentPage * productsPerPage
    );
  
    // Hàm xử lý sự kiện khi click vào nút "Thêm"
    
  
    // Hàm xử lý sự kiện khi chuyển trang
    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
    };
    
    const [isFormOpen, setIsFormOpen] = useState(false);

    const handleAdd = () => {
        setIsFormOpen(true);
      };
    
      const handleFormClose = () => {
        setIsFormOpen(false);
      };
    
      const handleProductAdd = (newProduct) => {
        setProducts([...products, newProduct]);
        setSuccessMessage('Thêm sản phẩm thành công!');
        setTimeout(() => {
        setSuccessMessage('');
        }, 3000); // Hiển thị thông báo trong 3 giây, sau đó ẩn
        handleFormClose();
      };

      const handleProductUpdate = (updatedProduct) => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );
      };

      
      const handleProductDelete = (productId) => {
        // Xử lý logic xóa sản phẩm ở đây
        setProducts(products.filter((product) => product.id !== productId));
        setDeleteMessage('Xóa sản phẩm thành công!');
        setTimeout(() => {
        setDeleteMessage('');
        }, 3000); // Hiển thị thông báo trong 3 giây, sau đó ẩn
      };

    return (
      <div className="product-management-page">
        {/* Header */}
        <Header />
  
        {/* Vùng quản lý sản phẩm dạng bảng */}
        <div className="product-management-content">
          <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>

          {successMessage && (
          <div className="bg-green-200 text-green-800 p-2 mb-4">
            {successMessage}
          </div>
        )}

            {deleteMessage && (
          <div className="bg-red-200 text-red-800 p-2 mb-4">
            {deleteMessage}
          </div>
        )}
  
          {/* Ô tìm kiếm và nút "Thêm" */}
          <div className="mb-2 flex items-center">
            <input
              type="text"
              placeholder="Nhập tên sản phẩm..."
              value={searchTerm}
              onChange={handleSearch}
              className="border border-gray-400 px-2 py-1 mr-2"
            />
            {/* Nút "Thêm" */}
            <button className="bg-green-500 text-white px-4 py-1" onClick={handleAdd}>
              Thêm
            </button>
          </div>
  
          {/* Bảng sản phẩm */}
          <ProductTable products={currentProducts} onDelete={handleProductDelete} onEdit={handleEdit} />
  
          {/* Phân trang */}
          <div className="mt-4 flex justify-end">
            <div>
              <button
                className="bg-blue-500 text-white px-4 py-1 ml-2"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous Page
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-1 ml-2"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next Page
              </button>
            </div>
          </div>
        </div>
        {isFormOpen && <ProductForm onClose={handleFormClose} onProductAdd={handleProductAdd} existingProducts={products} onProductUpdate={handleProductUpdate}/>}
      </div>
    );
  };
  
  export default ProductManagementPage;