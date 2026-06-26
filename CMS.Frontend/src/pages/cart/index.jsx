import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartTable from './CartTable';

function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const customerInfo = JSON.parse(localStorage.getItem('customerInfo'));

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart')) || []);
  }, []);

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
    
    navigate('/checkout');
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
          
          <CartTable cart={cart} updateQuantity={updateQuantity} removeItem={removeItem} />

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
