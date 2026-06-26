import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const customerInfo = JSON.parse(localStorage.getItem('customerInfo'));

  const [formData, setFormData] = useState({
    fullName: customerInfo?.fullName || '',
    phone: customerInfo?.phone || '',
    address: customerInfo?.address || '',
    notes: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!customerInfo) {
      alert('Vui lòng đăng nhập để tiến hành thanh toán!');
      navigate('/login');
      return;
    }
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartData.length === 0) {
      alert('Giỏ hàng trống!');
      navigate('/products');
      return;
    }
    setCart(cartData);
  }, [navigate, customerInfo]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Vui lòng nhập họ và tên.';
    if (!formData.phone.trim()) newErrors.phone = 'Vui lòng nhập số điện thoại.';
    else if (!/^\d{10,11}$/.test(formData.phone.replace(/\s+/g, ''))) newErrors.phone = 'Số điện thoại không hợp lệ.';
    if (!formData.address.trim()) newErrors.address = 'Vui lòng nhập địa chỉ giao hàng.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    // Gộp thông tin giao hàng vào trường Notes để lưu vào DB (vì bảng Order chỉ có Notes)
    const combinedNotes = `Người nhận: ${formData.fullName}\nSĐT: ${formData.phone}\nĐịa chỉ: ${formData.address}\nGhi chú: ${formData.notes}`;

    const payload = {
      customerId: customerInfo.id,
      notes: combinedNotes,
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
      .catch(err => {
        alert(err.response?.data?.message || 'Có lỗi xảy ra khi đặt hàng');
      });
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container section-padding">
      <h1 className="page-title">Thanh Toán Đơn Hàng</h1>
      
      <div className="cart-wrapper" style={{ alignItems: 'flex-start' }}>
        {/* Cột trái: Form thông tin */}
        <div className="checkout-form" style={{ flex: 2, background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '20px' }}>Thông tin giao hàng</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '15px' }}>
              <label className="form-label">Họ và Tên <span style={{color: 'red'}}>*</span></label>
              <input 
                type="text" 
                name="fullName"
                className="form-input" 
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Nhập họ và tên người nhận"
                style={{ borderColor: errors.fullName ? '#ef4444' : '#e5e7eb' }}
              />
              {errors.fullName && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '5px' }}>{errors.fullName}</p>}
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label className="form-label">Số điện thoại <span style={{color: 'red'}}>*</span></label>
              <input 
                type="tel" 
                name="phone"
                className="form-input" 
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ví dụ: 0987654321"
                style={{ borderColor: errors.phone ? '#ef4444' : '#e5e7eb' }}
              />
              {errors.phone && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '5px' }}>{errors.phone}</p>}
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label className="form-label">Địa chỉ giao hàng <span style={{color: 'red'}}>*</span></label>
              <input 
                type="text" 
                name="address"
                className="form-input" 
                value={formData.address}
                onChange={handleChange}
                placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố"
                style={{ borderColor: errors.address ? '#ef4444' : '#e5e7eb' }}
              />
              {errors.address && <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '5px' }}>{errors.address}</p>}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label className="form-label">Ghi chú thêm</label>
              <textarea 
                name="notes"
                className="form-input form-textarea" 
                rows="3"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Lưu ý khi giao hàng (ví dụ: giao ngoài giờ hành chính...)"
              />
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <Link to="/cart" className="btn-outline" style={{ padding: '12px 20px', borderRadius: '6px', textDecoration: 'none', border: '1px solid #ddd', color: '#555', fontWeight: '500' }}>
                ← Quay lại giỏ hàng
              </Link>
              <button type="submit" className="checkout-btn" style={{ flex: 1, margin: 0 }}>
                Xác Nhận Đặt Hàng
              </button>
            </div>
          </form>
        </div>

        {/* Cột phải: Tóm tắt */}
        <div className="cart-summary" style={{ flex: 1, sticky: 'top', top: '20px' }}>
          <div className="summary-card">
            <h3 style={{ marginBottom: '20px', fontSize: '18px', fontWeight: '700' }}>Tóm tắt đơn hàng</h3>
            
            <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px', paddingRight: '5px' }}>
              {cart.map((item, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}>
                  <div style={{ flex: 1, paddingRight: '10px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '500', marginBottom: '5px' }}>{item.name}</div>
                    <div style={{ fontSize: '13px', color: '#64748b' }}>SL: {item.quantity}</div>
                  </div>
                  <div style={{ fontWeight: '600', fontSize: '14px' }}>
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-row">
              <span>Tạm tính ({cart.length} sản phẩm):</span>
              <span>{formatPrice(totalAmount)}</span>
            </div>
            <div className="summary-row">
              <span>Phí giao hàng:</span>
              <span style={{ color: '#16a34a', fontWeight: '600' }}>Miễn phí</span>
            </div>
            <div className="summary-total" style={{ borderTop: '2px solid #e2e8f0', paddingTop: '15px', marginTop: '15px' }}>
              <span>Tổng cộng:</span>
              <span className="summary-total-price">{formatPrice(totalAmount)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
