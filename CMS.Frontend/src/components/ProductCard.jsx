import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, RefreshCw, Star } from 'lucide-react';

const FALLBACK_PRODUCT_IMAGE = "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=400";
const BACKEND_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5188';

const getImageUrl = (url, fallback) => {
  if (!url) return fallback;
  if (url.startsWith('http')) return url;
  return `${BACKEND_URL}${url}`;
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

function ProductCard({ product }) {
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingIndex = cart.findIndex(item => item.productId === product.id);
    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1
      });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    alert(`Đã thêm "${product.name}" vào giỏ hàng!`);
  };

  return (
    <Link to={`/products/${product.id}`} className="f-product-card" style={{ textDecoration: 'none' }}>
      <div className="f-price-container">
        <div className="f-price-rect">{formatPrice(product.price)}</div>
      </div>

      <div className="f-img-wrapper">
        <img src={getImageUrl(product.imageUrl, FALLBACK_PRODUCT_IMAGE)} alt={product.name} />
      </div>

      <div className="f-action-bar">
        <button onClick={(e) => handleAddToCart(e, product)} className="f-action-btn"><ShoppingCart size={16} /></button>
        <button onClick={(e) => e.preventDefault()} className="f-action-btn"><Heart size={16} /></button>
        <button onClick={(e) => e.preventDefault()} className="f-action-btn"><RefreshCw size={16} /></button>
      </div>

      <div className="f-product-info">
        <h3 className="f-product-name">{product.name}</h3>
        <div className="f-rating">
          <Star size={12} fill="#ef4444" color="#ef4444" />
          <Star size={12} fill="#ef4444" color="#ef4444" />
          <Star size={12} fill="#ef4444" color="#ef4444" />
          <Star size={12} fill="#ef4444" color="#ef4444" />
          <Star size={12} color="#ef4444" />
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
