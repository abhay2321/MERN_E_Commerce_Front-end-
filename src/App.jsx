/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import ShowProduct from "./Components/product/ShowProduct";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetail from "./Components/product/ProductDetail";
import Navber from "./Components/Navber";
import SearchProduct from "./Components/product/SearchProduct";
import Register from "./Components/user/Register";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Components/user/Login";
import Profile from "./Components/user/Profile";
import Cart from "./Components/Cart";
import Address from "./Components/Address";
import Checkout from "./Components/Checkout";
import OrderConfirmation from "./Components/orderConfirmation";

function App() {
  return (
    <Router>
      <Navber />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<ShowProduct />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/product/search/:term" element={<SearchProduct />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<Address />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orderConfirmation" element={<OrderConfirmation />} />
      </Routes>
    </Router>
  );
}

export default App;
