import React from 'react';

const BACKEND_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5188';

const getImg = (url) => {
  if (!url) return 'https://via.placeholder.com/90';
  return url.startsWith('http') ? url : `${BACKEND_URL}${url}`;
};

const formatPrice = (price) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

function CartTable({ cart, updateQuantity, removeItem }) {
  return (
    <div className="cart-items">
      {cart.map((item, index) => (
        <div key={index} className="cart-item">
          <img src={getImg(item.imageUrl)} alt={item.name} />
          <div className="cart-item-info">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-price">{formatPrice(item.price)}</div>
          </div>
          <div className="cart-qty-control">
            <button className="cart-qty-btn" onClick={() => updateQuantity(index, -1)}>−</button>
            <span className="cart-qty-val">{item.quantity}</span>
            <button className="cart-qty-btn" onClick={() => updateQuantity(index, 1)}>+</button>
          </div>
          <button className="cart-remove-btn" onClick={() => removeItem(index)}>×</button>
        </div>
      ))}
    </div>
  );
}

export default CartTable;
