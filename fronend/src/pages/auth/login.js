import React from 'react';
import BG from '../../assets/background.avif'
import { Link } from 'react-router-dom';
function Login() {
  return (
    <div className="h-screen flex">
    <div className="w-full">
      {/* Hình nền full width */}
      <img
        className="h-screen w-full object-cover object-center"
        src={BG}
        alt="Background"
      />
      {/* Card đăng nhập */}
      <div className="bg-white bg-opacity-50 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {/* Nhãn "Login" */}
        <h2 className="text-2xl text-center text-gray-800 font-bold mb-4">Login</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Enter your username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex items-center justify-center">
          <a href="/home">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Log In
            </button>
          </a>
          
        </div>
      </div>
    </div>
  </div>
  );
}

export default Login;
