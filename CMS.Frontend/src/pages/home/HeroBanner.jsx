import React from 'react';
import { Link } from 'react-router-dom';

const BACKEND_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5188';

const getImageUrl = (url, fallback) => {
  if (!url) return fallback;
  if (url.startsWith('http')) return url;
  return `${BACKEND_URL}${url}`;
};

function HeroBanner({ posts, allProducts }) {
  return (
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
  );
}

export default HeroBanner;
