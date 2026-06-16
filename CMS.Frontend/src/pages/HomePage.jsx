import React, { useState, useEffect } from 'react';
import { ChevronRight, Clock, ShoppingCart, Heart, RefreshCw, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api';
import './HomePage.css';

const FALLBACK_PRODUCT_IMAGE = "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=400";
const FALLBACK_POST_IMAGE = "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=400";

const BACKEND_URL = "http://localhost:5188";

function HomePage() {
  const [allProducts, setAllProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  
  const [activeTab, setActiveTab] = useState('bestseller');

  useEffect(() => {
    api.get('/products')
      .then(res => {
        setAllProducts(res.data);
        // Mặc định hiển thị tab Bán Chạy Nhất (sắp xếp random hoặc id cũ)
        const bestseller = [...res.data].sort((a, b) => a.id - b.id).slice(0, 12);
        setDisplayProducts(bestseller);
        setLoadingProducts(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoadingProducts(false);
      });

    api.get('/posts')
      .then(res => {
        const latestPosts = res.data.sort((a, b) => b.id - a.id).slice(0, 3);
        setPosts(latestPosts);
        setLoadingPosts(false);
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
        setLoadingPosts(false);
      });
  }, []);

  // Xử lý chuyển tab
  useEffect(() => {
    if (allProducts.length === 0) return;
    if (activeTab === 'new') {
      const news = [...allProducts].sort((a, b) => b.id - a.id).slice(0, 12);
      setDisplayProducts(news);
    } else if (activeTab === 'upcoming') {
      // Giả lập sắp phát hành bằng cách lấy các sản phẩm giữa
      const upcoming = [...allProducts].slice(allProducts.length / 2).slice(0, 12);
      setDisplayProducts(upcoming);
    } else {
      const bestseller = [...allProducts].sort((a, b) => a.id - b.id).slice(0, 12);
      setDisplayProducts(bestseller);
    }
  }, [activeTab, allProducts]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const getImageUrl = (url, fallback) => {
    if (!url) return fallback;
    if (url.startsWith('http')) return url;
    return `${BACKEND_URL}${url}`;
  };

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
    <main className="main-content container home-page-custom">
      {/* 1. Banners Section */}
      <div className="f-banners">
        <div className="f-banner-left">
          <img src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1200" alt="Sách truyền cảm hứng" />
          <div className="banner-overlay">
            <h2>Quyển Sách Thay Đổi Thế Giới</h2>
          </div>
        </div>
        <div className="f-banner-right">
          <img src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400" alt="Khuyến mãi" />
          <div className="banner-overlay right-overlay">
            <h3>-30%</h3>
          </div>
        </div>
      </div>

      {/* 2. Fahasa Tab Header */}
      <section className="f-section">
        <div className="f-tab-header">
          <div className="f-tabs">
            <button className={`f-tab ${activeTab === 'bestseller' ? 'active' : ''}`} onClick={() => setActiveTab('bestseller')}>BÁN CHẠY NHẤT</button>
            <button className={`f-tab ${activeTab === 'upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('upcoming')}>SẮP PHÁT HÀNH</button>
            <button className={`f-tab ${activeTab === 'new' ? 'active' : ''}`} onClick={() => setActiveTab('new')}>MỚI</button>
          </div>
          <Link to="/products" className="f-view-more">
            <ChevronRight size={18} color="#fff" fill="#fff" />
          </Link>
        </div>

        {/* 3. Product Grid */}
        {loadingProducts ? (
          <p style={{ padding: '20px', textAlign: 'center' }}>Đang tải danh sách sản phẩm...</p>
        ) : displayProducts.length === 0 ? (
          <p style={{ padding: '20px', textAlign: 'center' }}>Không có sản phẩm nào.</p>
        ) : (
          <div className="f-product-grid">
            {displayProducts.map(product => (
              <Link to={`/products/${product.id}`} key={product.id} className="f-product-card" style={{ textDecoration: 'none' }}>
                <div className="f-discount-circle">25%</div>
                <div className="f-price-container">
                  <div className="f-price-rect">{formatPrice(product.price)}</div>
                  <div className="f-old-price">{formatPrice(product.price * 1.33)}</div>
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
            ))}
          </div>
        )}
      </section>

      {/* News Section (Keep simple) */}
      <section className="section" style={{ marginTop: '40px' }}>
        <div className="section-header">
          <h2 className="section-title">Tin Tức</h2>
          <Link to="/posts" className="view-more">Xem tất cả <ChevronRight size={16} /></Link>
        </div>

        {loadingPosts ? (
          <p style={{ padding: '20px', textAlign: 'center' }}>Đang tải danh sách tin tức...</p>
        ) : posts.length === 0 ? (
          <p style={{ padding: '20px', textAlign: 'center' }}>Chưa có bài viết nào trong hệ thống.</p>
        ) : (
          <div className="news-grid">
            {posts.map(post => (
              <div key={post.id} className="news-card">
                <img
                  src={getImageUrl(post.imageUrl, FALLBACK_POST_IMAGE)}
                  alt={post.title}
                  className="news-img"
                />
                <div className="news-content">
                  <h3 className="news-title">{post.title}</h3>
                  <p className="news-desc">Danh mục: {post.categoryName}</p>
                  <span className="news-date">
                    <Clock size={12} /> {formatDate(post.createdAt)}
                  </span>
                  <Link to={`/posts/${post.id}`} className="read-more" style={{ display: 'inline-block', marginTop: '10px', color: 'var(--primary)', fontWeight: 'bold' }}>Đọc tiếp →</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default HomePage;
