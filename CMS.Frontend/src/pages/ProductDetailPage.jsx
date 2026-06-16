import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const getImg = (url) => {
    if (!url) return null;
    return url.startsWith('http') ? url : `http://localhost:5188${url}`;
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  const addToCart = () => {
    if (!product) return;

    if (product.stockQuantity <= 0) {
      alert('Sản phẩm này đã hết hàng!');
      return;
    }

    // Kiểm tra đăng nhập
    const customerInfo = localStorage.getItem('customerInfo');
    if (!customerInfo) {
      alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!');
      navigate('/login');
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(i => i.productId === product.id);
    if (existing) {
      if (existing.quantity + quantity > product.stockQuantity) {
        alert(`Không đủ tồn kho! Bạn chỉ có thể mua tối đa ${product.stockQuantity} sản phẩm này.`);
        return;
      }
      existing.quantity += quantity;
    } else {
      if (quantity > product.stockQuantity) {
        alert(`Không đủ tồn kho! Bạn chỉ có thể mua tối đa ${product.stockQuantity} sản phẩm này.`);
        return;
      }
      cart.push({ productId: product.id, name: product.name, price: product.price, imageUrl: product.imageUrl, quantity });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    alert('Đã thêm vào giỏ hàng!');
    navigate('/cart');
  };

  if (!product) return <p className="state-msg">Đang tải thông tin sản phẩm...</p>;

  return (
    <div className="container section-padding">
      <Link to="/products" className="back-link">← Quay lại danh sách sản phẩm</Link>

      <div className="product-detail-wrapper">
        {/* Image */}
        <div className="product-detail-img">
          {getImg(product.imageUrl) ? (
            <img src={getImg(product.imageUrl)} alt={product.name} />
          ) : (
            <div style={{ height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
              Không có ảnh
            </div>
          )}
        </div>

        {/* Info */}
        <div className="product-detail-info">
          <div className="product-detail-category">{product.categoryName}</div>
          <h1 className="product-detail-name">{product.name}</h1>
          <div className="product-detail-price">{formatPrice(product.price)}</div>
          <div className="product-detail-stock">
            {product.stockQuantity > 0 
              ? `✓ Còn hàng (${product.stockQuantity} sản phẩm)` 
              : <span style={{color: '#dc3545'}}>❌ Hết hàng</span>}
          </div>
          <div className="product-detail-desc">
            {product.description || 'Sản phẩm chất lượng cao, đảm bảo nguồn gốc xuất xứ rõ ràng.'}
          </div>

          {/* Quantity */}
          <div className="qty-control">
            <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={product.stockQuantity === 0}>−</button>
            <span className="qty-value">{product.stockQuantity === 0 ? 0 : quantity}</span>
            <button className="qty-btn" onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))} disabled={product.stockQuantity === 0}>+</button>
          </div>

          <button 
            className="btn-add-cart" 
            onClick={addToCart}
            disabled={product.stockQuantity === 0}
            style={{ 
              backgroundColor: product.stockQuantity === 0 ? '#ccc' : 'var(--primary)',
              cursor: product.stockQuantity === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            {product.stockQuantity === 0 ? '❌ Hết Hàng' : '🛒 Thêm vào giỏ hàng'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
