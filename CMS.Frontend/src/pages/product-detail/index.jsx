import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import ProductInfo from './ProductInfo';

const BACKEND_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5188';

function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    productService.getProductById(id)
      .then(res => setProduct(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const getImg = (url) => {
    if (!url) return null;
    return url.startsWith('http') ? url : `${BACKEND_URL}${url}`;
  };

  const addToCart = () => {
    if (!product) return;

    if (product.stockQuantity <= 0) {
      alert('Sản phẩm này đã hết hàng!');
      return;
    }

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
        <div className="product-detail-img">
          {getImg(product.imageUrl) ? (
            <img src={getImg(product.imageUrl)} alt={product.name} />
          ) : (
            <div style={{ height: '380px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
              Không có ảnh
            </div>
          )}
        </div>

        <ProductInfo 
          product={product} 
          quantity={quantity} 
          setQuantity={setQuantity} 
          addToCart={addToCart} 
        />
      </div>
    </div>
  );
}

export default ProductDetailPage;
