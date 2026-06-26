import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { bannerService } from '../../services/bannerService';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const BACKEND_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5188';

const getImageUrl = (url, fallback) => {
  if (!url) return fallback;
  if (url.startsWith('http')) return url;
  return `${BACKEND_URL}${url}`;
};

function HeroBanner({ posts, allProducts }) {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      const data = await bannerService.getActiveBanners();
      setBanners(data);
    };
    fetchBanners();
  }, []);

  // Nếu trong database chưa có banner nào, sử dụng banner mặc định từ Post/Product như cũ
  if (banners.length === 0) {
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

  // Chế độ Slider
  return (
    <div className="f-banners" style={{ display: 'block', height: '400px', borderRadius: '12px', overflow: 'hidden' }}>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        style={{ width: '100%', height: '100%' }}
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            {banner.linkUrl ? (
              <a href={banner.linkUrl} style={{ display: 'block', width: '100%', height: '100%', position: 'relative' }}>
                <img 
                  src={getImageUrl(banner.imageUrl, "https://via.placeholder.com/1200x400")} 
                  alt={banner.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div className="banner-overlay" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', color: 'white', position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 30px' }}>
                  <h2 style={{ fontSize: '28px', margin: 0, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>{banner.title}</h2>
                </div>
              </a>
            ) : (
              <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                <img 
                  src={getImageUrl(banner.imageUrl, "https://via.placeholder.com/1200x400")} 
                  alt={banner.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div className="banner-overlay" style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', color: 'white', position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 30px' }}>
                  <h2 style={{ fontSize: '28px', margin: 0, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>{banner.title}</h2>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeroBanner;
