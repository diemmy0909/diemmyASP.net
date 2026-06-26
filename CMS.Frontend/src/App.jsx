import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/home';
import ShopPage from './pages/shop';
import ProductDetailPage from './pages/product-detail';
import BlogPage from './pages/blog';
import BlogDetail from './pages/blog/BlogDetail';
import CartPage from './pages/cart';
import CheckoutPage from './pages/checkout';
import LoginPage from './pages/auth/Login';
import RegisterPage from './pages/auth/Register';
import ProfilePage from './pages/profile';
import OrdersPage from './pages/orders';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ShopPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/posts" element={<BlogPage />} />
          <Route path="/posts/:id" element={<BlogDetail />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
