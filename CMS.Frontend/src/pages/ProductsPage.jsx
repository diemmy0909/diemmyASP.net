import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ShoppingCart, Heart, RefreshCw, Star } from 'lucide-react';
import api from '../api';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get('search') || '';

  useEffect(() => {
    api.get('/categoryproducts')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    setLoading(true);
    const url = selectedCategory === 'all' ? '/products' : `/products/category/${selectedCategory}`;
    api.get(url)
      .then(res => { setProducts(res.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, [selectedCategory]);

  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  const getImg = (url) => {
    if (!url) return null;
    return url.startsWith('http') ? url : `http://localhost:5188${url}`;
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchKeyword.toLowerCase()) || 
    (p.categoryName && p.categoryName.toLowerCase().includes(searchKeyword.toLowerCase()))
  );

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
    <div className="container section-padding">
      <h1 className="page-title">
        {searchKeyword ? `Kết quả tìm kiếm cho: "${searchKeyword}"` : 'Tất Cả Sản Phẩm'}
      </h1>

      {/* Category filter */}
      <div className="filter-bar">
        <button
          className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedCategory('all')}
        >
          Tất cả
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="state-msg">Đang tải sản phẩm...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="state-msg">Không tìm thấy sản phẩm nào.</p>
      ) : (
        <div className="f-product-grid" style={{ gap: '20px', padding: 0 }}>
          {filteredProducts.map(product => (
            <Link to={`/products/${product.id}`} key={product.id} className="f-product-card" style={{ textDecoration: 'none' }}>
              <div className="f-discount-circle">25%</div>
              <div className="f-price-container">
                <div className="f-price-rect">{formatPrice(product.price)}</div>
                <div className="f-old-price">{formatPrice(product.price * 1.33)}</div>
              </div>

              <div className="f-img-wrapper">
                {getImg(product.imageUrl) ? (
                  <img src={getImg(product.imageUrl)} alt={product.name} />
                ) : (
                  <div style={{ color:'#ccc', fontSize:'13px' }}>Không có ảnh</div>
                )}
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
    </div>
  );
}

export default ProductsPage;
