import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { orderService } from '../../services/orderService';
import './OrdersPage.css';

const BACKEND_URL = "http://localhost:5188";

function OrdersPage() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const customerInfoStr = localStorage.getItem('customerInfo');
    if (!customerInfoStr) {
      navigate('/login');
      return;
    }

    const customerInfo = JSON.parse(customerInfoStr);
    
    orderService.getCustomerOrders(customerInfo.id)
      .then(res => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Lỗi khi lấy danh sách đơn hàng:", err);
        setError('Không thể tải danh sách đơn hàng. Vui lòng thử lại sau.');
        setLoading(false);
      });
  }, [navigate]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN');
  };

  const getImageUrl = (url) => {
    if (!url) return "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=100";
    if (url.startsWith('http')) return url;
    return `${BACKEND_URL}${url}`;
  };

  const getStatusText = (status) => {
    switch(status) {
      case 0: return { text: 'Chờ duyệt', className: 'status-0' };
      case 1: return { text: 'Đang giao', className: 'status-1' };
      case 2: return { text: 'Đã xong', className: 'status-2' };
      default: return { text: 'Không xác định', className: '' };
    }
  };

  if (loading) {
    return (
      <div className="orders-page container">
        <div className="orders-container" style={{ textAlign: 'center', padding: '50px' }}>
          Đang tải danh sách đơn hàng...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page container">
        <div className="orders-container" style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page container">
      <div className="orders-container">
        <h2 className="orders-title">Đơn hàng của tôi</h2>
        
        {orders.length === 0 ? (
          <div className="no-orders">
            <p>Bạn chưa có đơn hàng nào.</p>
            <button 
              className="btn-primary" 
              style={{ marginTop: '15px' }}
              onClick={() => navigate('/products')}
            >
              Tiếp tục mua sắm
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => {
              const statusInfo = getStatusText(order.status);
              return (
                <div key={order.id} className="order-item">
                  <div className="order-header">
                    <div className="order-info">
                      <span>Mã đơn hàng: <strong>#{order.id}</strong></span>
                      <span>Ngày đặt: {formatDate(order.orderDate)}</span>
                    </div>
                    <div className={`order-status ${statusInfo.className}`}>
                      {statusInfo.text}
                    </div>
                  </div>
                  
                  <div className="order-body">
                    {order.items && order.items.map((item, idx) => (
                      <div key={idx} className="order-product">
                        <img 
                          src={getImageUrl(item.imageUrl)} 
                          alt={item.name} 
                          className="order-product-img"
                        />
                        <div className="order-product-details">
                          <h4 className="order-product-name">{item.name}</h4>
                          <div className="order-product-meta">
                            Số lượng: {item.quantity} x {formatPrice(item.unitPrice)}
                          </div>
                        </div>
                        <div className="order-product-price">
                          {formatPrice(item.quantity * item.unitPrice)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="order-footer">
                    <span>Tổng tiền: </span>
                    <span className="order-total-amount">{formatPrice(order.totalAmount)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrdersPage;
