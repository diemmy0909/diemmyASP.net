import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { bannerService } from '../../services/bannerService';
import { blogService } from '../../services/blogService';
import { productService } from '../../services/productService';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const BACKEND_URL = import.meta.env.VITE_API_URL
  ? import.meta.env.VITE_API_URL.replace('/api', '')
  : 'http://localhost:5188';

const getImageUrl = (url, fallback) => {
  if (!url) return fallback;
  if (url.startsWith('http')) return url;
  return `${BACKEND_URL}${url}`;
};

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=1400',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=1400',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1400',
];

function HeroBanner() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSlides = async () => {
      try {
        // 1. Ưu tiên lấy từ bảng Advertisements
        const banners = await bannerService.getActiveBanners();
        if (banners && banners.length > 0) {
          setSlides(banners.map(b => ({
            id: b.id,
            title: b.title,
            image: getImageUrl(b.imageUrl, FALLBACK_IMAGES[0]),
            link: b.linkUrl || '#',
            badge: 'Khuyến mãi',
          })));
          setLoading(false);
          return;
        }

        // 2. Nếu chưa có banner → kết hợp Posts + Products
        const [postsRes, productsRes] = await Promise.all([
          blogService.getPosts(1, 5).catch(() => ({ data: { items: [] } })),
          productService.getProducts(1, 5).catch(() => ({ data: { items: [] } })),
        ]);

        const postSlides = (postsRes.data?.items || []).slice(0, 3).map(p => ({
          id: `post-${p.id}`,
          title: p.title,
          image: getImageUrl(p.imageUrl, FALLBACK_IMAGES[0]),
          link: `/posts/${p.id}`,
          badge: 'Tin tức',
        }));

        const productSlides = (productsRes.data?.items || []).slice(0, 3).map(p => ({
          id: `product-${p.id}`,
          title: p.name,
          subtitle: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p.price),
          image: getImageUrl(p.imageUrl, FALLBACK_IMAGES[1]),
          link: `/products/${p.id}`,
          badge: 'Sản phẩm mới',
        }));

        const combined = [...postSlides, ...productSlides];
        setSlides(combined.length > 0 ? combined : [
          { id: 'default-1', title: 'Thế giới LEGO Đầy Màu Sắc', image: FALLBACK_IMAGES[0], link: '/products', badge: 'Khám phá ngay' },
          { id: 'default-2', title: 'Sản phẩm mới nhất', image: FALLBACK_IMAGES[1], link: '/products', badge: 'Xem thêm' },
          { id: 'default-3', title: 'Ưu đãi hấp dẫn', image: FALLBACK_IMAGES[2], link: '/products', badge: 'Mua ngay' },
        ]);
      } catch (err) {
        console.error('Error loading banner:', err);
        setSlides([
          { id: 'err-1', title: 'Thế giới LEGO Đầy Màu Sắc', image: FALLBACK_IMAGES[0], link: '/products', badge: 'Khám phá ngay' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadSlides();
  }, []);

  if (loading) {
    return (
      <div className="hero-banner-wrapper" style={{ flex: 1, height: '340px', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ color: 'white', fontSize: '16px', opacity: 0.7 }}>Đang tải banner...</div>
      </div>
    );
  }

  return (
    <div className="hero-banner-wrapper">
      <style>{`
        .hero-banner-wrapper {
          flex: 1;
          border-radius: 10px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 8px 32px rgba(0,0,0,0.18);
        }
        .hero-banner-wrapper .swiper {
          width: 100%;
          height: 340px;
        }
        .hero-slide-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 6s ease;
          transform: scale(1.05);
        }
        .swiper-slide-active .hero-slide-img {
          transform: scale(1);
        }
        .hero-slide-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.05) 0%,
            rgba(0,0,0,0.15) 50%,
            rgba(0,0,0,0.65) 100%
          );
          z-index: 1;
        }
        .hero-slide-content {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 24px 30px;
          z-index: 2;
          transform: translateY(8px);
          opacity: 0;
          transition: transform 0.6s ease 0.3s, opacity 0.6s ease 0.3s;
        }
        .swiper-slide-active .hero-slide-content {
          transform: translateY(0);
          opacity: 1;
        }
        .hero-slide-badge {
          display: inline-block;
          background: #d70018;
          color: white;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 4px 12px;
          border-radius: 20px;
          margin-bottom: 8px;
        }
        .hero-slide-title {
          color: white;
          font-size: 26px;
          font-weight: 700;
          text-shadow: 1px 2px 8px rgba(0,0,0,0.5);
          margin: 0 0 6px 0;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .hero-slide-subtitle {
          color: #ffe066;
          font-size: 18px;
          font-weight: 700;
          margin: 0 0 12px 0;
        }
        .hero-slide-btn {
          display: inline-block;
          background: white;
          color: #d70018;
          font-size: 13px;
          font-weight: 700;
          padding: 8px 22px;
          border-radius: 25px;
          text-decoration: none;
          transition: background 0.2s, transform 0.2s;
        }
        .hero-slide-btn:hover {
          background: #d70018;
          color: white;
          transform: scale(1.05);
        }
        .hero-banner-wrapper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255,255,255,0.5);
          opacity: 1;
        }
        .hero-banner-wrapper .swiper-pagination-bullet-active {
          background: white;
          width: 24px;
          border-radius: 4px;
          transition: width 0.3s;
        }
        .hero-banner-wrapper .swiper-button-next,
        .hero-banner-wrapper .swiper-button-prev {
          color: white;
          width: 38px;
          height: 38px;
          background: rgba(0,0,0,0.35);
          border-radius: 50%;
          backdrop-filter: blur(4px);
        }
        .hero-banner-wrapper .swiper-button-next::after,
        .hero-banner-wrapper .swiper-button-prev::after {
          font-size: 14px;
          font-weight: 800;
        }
        .hero-banner-wrapper .swiper-button-next:hover,
        .hero-banner-wrapper .swiper-button-prev:hover {
          background: rgba(215,0,24,0.75);
        }
      `}</style>

      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        effect="fade"
        autoplay={{ delay: 3800, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={slides.length > 1}
        speed={800}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} style={{ position: 'relative' }}>
            <img
              className="hero-slide-img"
              src={slide.image}
              alt={slide.title}
            />
            <div className="hero-slide-overlay" />
            <div className="hero-slide-content">
              {slide.badge && <span className="hero-slide-badge">{slide.badge}</span>}
              <h2 className="hero-slide-title">{slide.title}</h2>
              {slide.subtitle && <p className="hero-slide-subtitle">{slide.subtitle}</p>}
              <Link to={slide.link} className="hero-slide-btn">
                Xem ngay →
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HeroBanner;
