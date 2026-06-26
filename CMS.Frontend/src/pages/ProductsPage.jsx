import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ShoppingCart, Heart, RefreshCw, Star } from 'lucide-react';
import api from '../api';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') ? parseInt(searchParams.get('category')) : 'all';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [loading, setLoading] = useState(true);
  const searchKeyword = searchParams.get('search') || '';
  
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const [totalPages, setTotalPages] = useState(1);

  // Đồng bộ category từ URL vào state khi có thay đổi
  useEffect(() => {
    const catId = searchParams.get('category');
    if (catId) {
      setSelectedCategory(parseInt(catId));
    } else {
      setSelectedCategory('all');
    }
  }, [searchParams]);

  useEffect(() => {
    api.get('/categoryproducts')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    setLoading(true);
    let url = selectedCategory === 'all' ? `/products?page=${currentPage}` : `/products/category/${selectedCategory}?page=${currentPage}`;
    if (searchKeyword && selectedCategory === 'all') {
      url += `&search=${encodeURIComponent(searchKeyword)}`;
    }
    api.get(url)
      .then(res => { 
        setProducts(res.data.items || []); 
        setTotalPages(res.data.totalPages || 1);
        setLoading(false); 
      })
      .catch(err => { console.error(err); setLoading(false); });
  }, [selectedCategory, currentPage, searchKeyword]);

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

  const getPageTitle = () => {
    if (searchKeyword) return `Kết quả tìm kiếm cho: "${searchKeyword}"`;
    if (selectedCategory !== 'all') {
      const cat = categories.find(c => c.id === selectedCategory);
      return cat ? `Danh mục: ${cat.name}` : 'Sản phẩm theo danh mục';
    }
    return 'Tất Cả Sản Phẩm';
  };

  return (
    <div className="container section-padding">
      <h1 className="page-title">
        {getPageTitle()}
      </h1>

      <div className="filter-bar">
        <button
          className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => {
            setSelectedCategory('all');
            setSearchParams(searchKeyword ? { search: searchKeyword, page: 1 } : { page: 1 });
          }}
        >
          Tất cả
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory(cat.id);
              setSearchParams(searchKeyword ? { search: searchKeyword, category: cat.id, page: 1 } : { category: cat.id, page: 1 });
            }}
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
              <div className="f-price-container">
                <div className="f-price-rect">{formatPrice(product.price)}</div>
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

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '30px' }}>
          <button 
            disabled={currentPage === 1}
            onClick={() => {
              const newParams = new URLSearchParams(searchParams);
              newParams.set('page', currentPage - 1);
              setSearchParams(newParams);
            }}
            style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
          >
            Trang trước
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => {
                const newParams = new URLSearchParams(searchParams);
                newParams.set('page', page);
                setSearchParams(newParams);
              }}
              style={{
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
                backgroundColor: currentPage === page ? 'var(--primary)' : '#fff',
                color: currentPage === page ? '#fff' : '#333'
              }}
            >
              {page}
            </button>
          ))}

          <button 
            disabled={currentPage === totalPages}
            onClick={() => {
              const newParams = new URLSearchParams(searchParams);
              newParams.set('page', currentPage + 1);
              setSearchParams(newParams);
            }}
            style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '4px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
          >
            Trang sau
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
