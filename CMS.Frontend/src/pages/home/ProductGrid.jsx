import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductCard from '../../components/ProductCard';

function ProductGrid({ displayProducts, loadingProducts, activeTab, setActiveTab }) {
  return (
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

      {loadingProducts ? (
        <p style={{ padding: '20px', textAlign: 'center' }}>Đang tải danh sách sản phẩm...</p>
      ) : displayProducts.length === 0 ? (
        <p style={{ padding: '20px', textAlign: 'center' }}>Không có sản phẩm nào.</p>
      ) : (
        <div className="f-product-grid">
          {displayProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductGrid;
