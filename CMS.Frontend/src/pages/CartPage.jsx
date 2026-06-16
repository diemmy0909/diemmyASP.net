import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

function CartPage() {
  const [cart, setCart] = useState([]);
  const [notes, setNotes] = useState('');
  const navigate = useNavigate();
  const customerInfo = JSON.parse(localStorage.getItem('customerInfo'));

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')) || []);
  }, []);

  const getImg = (url) => {
    if (!url) return 'https://via.placeholder.com/90';
    return url.startsWith('http') ? url : `http://localhost:5188${url}`;
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  const updateQuantity = (index, delta) => {
    const newCart = [...cart];
    newCart[index].quantity += delta;
    if (newCart[index].quantity < 1) newCart[index].quantity = 1;
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('storage'));
  };

  const removeItem = (index) => {
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('storage'));
  };

  const handleCheckout = () => {
    if (!customerInfo) {
      alert('Vui lòng đăng nhập để đặt hàng!');
      navigate('/login');
      return;
    }
    if (cart.length === 0) return;

    const payload = {
      customerId: customerInfo.id,
      notes,
      items: cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.price
      }))
    };

    api.post('/orders', payload)
      .then(res => {
        alert(res.data.message || 'Đặt hàng thành công!');
        localStorage.removeItem('cart');
        setCart([]);
        window.dispatchEvent(new Event('storage'));
        navigate('/');
      })
      .catch(err => alert(err.response?.data?.message || 'Có lỗi xảy ra khi đặt hàng'));
  };

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container section-padding">
      <h1 className="page-title">Giỏ Hàng Của Bạn</h1>

      {cart.length === 0 ? (
        <div className="empty-cart-box">
          <h2>Giỏ hàng đang trống</h2>
          <Link to="/products" className="btn-go-shop">Tiếp tục mua sắm</Link>
        </div>
      ) : (
        <div className="cart-wrapper">
          {/* Items */}
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

          {/* Summary */}
          <div className="cart-summary">
            <div className="summary-card">
              <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '700' }}>Tổng quan đơn hàng</h3>

              <div className="summary-row">
                <span>Tạm tính ({cart.length} sản phẩm):</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
              <div className="summary-row">
                <span>Phí giao hàng:</span>
                <span style={{ color: '#16a34a', fontWeight: '600' }}>Miễn phí</span>
              </div>
              <div className="summary-total">
                <span>Tổng cộng:</span>
                <span className="summary-total-price">{formatPrice(totalAmount)}</span>
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label className="form-label">Ghi chú đơn hàng:</label>
                <textarea
                  className="form-input form-textarea"
                  rows="3"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ghi chú thêm cho người bán..."
                />
              </div>

              <button className="checkout-btn" onClick={handleCheckout}>
                Tiến Hành Đặt Hàng →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
