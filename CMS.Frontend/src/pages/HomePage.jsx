import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, Clock, ShoppingCart, Heart, RefreshCw, Star,
  Smartphone, Laptop, Headphones, Watch, Home, Plug, Monitor, Tv, Package, Percent, Newspaper
} from 'lucide-react';
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
  const [categories, setCategories] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  
  const [activeTab, setActiveTab] = useState('new');

  useEffect(() => {
    api.get('/products')
      .then(res => {
        const productsData = res.data.items || [];
        setAllProducts(productsData);
        // Mặc định hiển thị tab Sản phẩm mới
        const news = [...productsData].sort((a, b) => b.id - a.id).slice(0, 12);
        setDisplayProducts(news);
        setLoadingProducts(false);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
        setLoadingProducts(false);
      });

    api.get('/posts')
      .then(res => {
        const postsData = res.data.items || [];
        const latestPosts = postsData.sort((a, b) => b.id - a.id).slice(0, 3);
        setPosts(latestPosts);
        setLoadingPosts(false);
      })
      .catch(error => {
        console.error("Error fetching posts:", error);
        setLoadingPosts(false);
      });

    api.get('/categoryproducts')
      .then(res => {
        setCategories(res.data);
        setLoadingCategories(false);
      })
      .catch(error => {
        console.error("Error fetching categories:", error);
        setLoadingCategories(false);
      });
  }, []);

  // Xử lý chuyển tab
  useEffect(() => {
    if (allProducts.length === 0) return;
    if (activeTab === 'new') {
      const news = [...allProducts].sort((a, b) => b.id - a.id).slice(0, 12);
      setDisplayProducts(news);
    } else {
      // Lấy các sản phẩm được đánh dấu sắp phát hành
      const upcoming = allProducts.filter(p => p.isUpcoming).slice(0, 12);
      setDisplayProducts(upcoming);
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

  const getCategoryIcon = (name) => {
    if (!name) return <ChevronRight size={18} />;
    const lowerName = name.toLowerCase();
    if (lowerName.includes('điện thoại') || lowerName.includes('tablet') || lowerName.includes('smart')) return <Smartphone size={18} />;
    if (lowerName.includes('laptop') || lowerName.includes('macbook')) return <Laptop size={18} />;
    if (lowerName.includes('âm thanh') || lowerName.includes('tai nghe') || lowerName.includes('loa') || lowerName.includes('mic')) return <Headphones size={18} />;
    if (lowerName.includes('đồng hồ') || lowerName.includes('camera')) return <Watch size={18} />;
    if (lowerName.includes('gia dụng') || lowerName.includes('làm đẹp') || lowerName.includes('nhà')) return <Home size={18} />;
    if (lowerName.includes('phụ kiện') || lowerName.includes('chuột') || lowerName.includes('phím') || lowerName.includes('cáp') || lowerName.includes('sạc')) return <Plug size={18} />;
    if (lowerName.includes('màn hình') || lowerName.includes('pc') || lowerName.includes('máy tính') || lowerName.includes('máy in')) return <Monitor size={18} />;
    if (lowerName.includes('tivi') || lowerName.includes('điện máy') || lowerName.includes('tv')) return <Tv size={18} />;
    if (lowerName.includes('cũ') || lowerName.includes('đổi mới')) return <RefreshCw size={18} />;
    if (lowerName.includes('khuyến mãi') || lowerName.includes('sale') || lowerName.includes('deal')) return <Percent size={18} />;
    if (lowerName.includes('tin tức') || lowerName.includes('công nghệ') || lowerName.includes('báo')) return <Newspaper size={18} />;
    return <Package size={18} />; // Default
  };

  return (
    <main className="main-content container home-page-custom">
      {/* Top Section with Sidebar and Banners */}
      <div className="home-top-section">
        <div className="sidebar-menu">
          {loadingCategories ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>Đang tải...</div>
          ) : categories.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>Chưa có danh mục</div>
          ) : (
            <ul>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/products?category=${category.id}`} className="sidebar-item-left" style={{ textDecoration: 'none', color: 'inherit', flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span className="sidebar-icon">{getCategoryIcon(category.name)}</span>
                    <span className="sidebar-text">{category.name}</span>
                  </Link>
                  <ChevronRight size={16} className="sidebar-arrow" />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 1. Banners Section */}
        <div className="f-banners">
          {posts.length > 0 ? (
            <Link to={`/posts/${posts[0].id}`} className="f-banner-left" style={{ textDecoration: 'none', color: 'inherit', display: 'block', position: 'relative' }}>
              <img src={getImageUrl(posts[0].imageUrl, "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=1200")} alt={posts[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="banner-overlay">
                <h2>{posts[0].title}</h2>
              </div>
            </Link>
          ) : (
            <div className="f-banner-left">
              <img src="https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=1200" alt="Thế giới LEGO" />
              <div className="banner-overlay">
                <h2>Thế Giới LEGO Đầy Màu Sắc</h2>
              </div>
            </div>
          )}

          {allProducts.length > 0 ? (
            <Link to={`/products/${allProducts[0].id}`} className="f-banner-right" style={{ textDecoration: 'none', display: 'block', position: 'relative' }}>
              <img src={getImageUrl(allProducts[0].imageUrl, "/lego_discount_banner.png")} alt={allProducts[0].name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="banner-overlay" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.6))', color: 'white', position: 'absolute', bottom: 0, left: 0, right: 0, padding: '15px' }}>
                <h3 style={{ fontSize: '18px', margin: 0, color: 'white' }}>Sản phẩm mới: {allProducts[0].name}</h3>
              </div>
            </Link>
          ) : (
            <div className="f-banner-right">
              <img src="/lego_discount_banner.png" alt="Khuyến mãi" />
            </div>
          )}
        </div>
      </div>

      {/* 2. Fahasa Tab Header */}
      <section className="f-section">
        <div className="f-tab-header">
          <div className="f-tabs">
            <button className={`f-tab ${activeTab === 'new' ? 'active' : ''}`} onClick={() => setActiveTab('new')}>SẢN PHẨM MỚI</button>
            <button className={`f-tab ${activeTab === 'upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('upcoming')}>SẮP PHÁT HÀNH</button>
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
