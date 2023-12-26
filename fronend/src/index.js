import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './pages/auth/login';
import Home from './pages/home'
import Product from './pages/product';
import Bill from './pages/bill'
import Report from './pages/report'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/products" element={<Product/>}></Route>
        <Route path='/bills' element={<Bill/>}></Route>
        <Route path='/reports' element={<Report/>}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);