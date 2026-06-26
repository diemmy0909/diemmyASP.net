import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService } from '../../services/productService';
import ShopHeader from './ShopHeader';
import ShopSidebar from './ShopSidebar';
import ProductList from './ProductList';
import LoadingOrEmpty from './LoadingOrEmpty';

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const initialCategory = searchParams.get('category') ? parseInt(searchParams.get('category')) : 'all';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [loading, setLoading] = useState(true);
  const searchKeyword = searchParams.get('search') || '';
  
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const catId = searchParams.get('category');
    if (catId) {
      setSelectedCategory(parseInt(catId));
    } else {
      setSelectedCategory('all');
    }
  }, [searchParams]);

  useEffect(() => {
    productService.getCategories()
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    setLoading(true);
    let request;
    if (selectedCategory === 'all') {
      request = productService.getProducts(currentPage, 12, searchKeyword);
    } else {
      request = productService.getProductsByCategory(selectedCategory, currentPage, 12);
    }
    
    request.then(res => { 
        setProducts(res.data.items || []); 
        setTotalPages(res.data.totalPages || 1);
        setLoading(false); 
      })
      .catch(err => { console.error(err); setLoading(false); });
  }, [selectedCategory, currentPage, searchKeyword]);

  const getPageTitle = () => {
    if (searchKeyword) return `Kết quả tìm kiếm cho: "${searchKeyword}"`;
    if (selectedCategory !== 'all') {
      const cat = categories.find(c => c.id === selectedCategory);
      return cat ? `Danh mục: ${cat.name}` : 'Sản phẩm theo danh mục';
    }
    return 'Tất Cả Sản Phẩm';
  };

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    if (catId === 'all') {
      setSearchParams(searchKeyword ? { search: searchKeyword, page: 1 } : { page: 1 });
    } else {
      setSearchParams(searchKeyword ? { search: searchKeyword, category: catId, page: 1 } : { category: catId, page: 1 });
    }
  };

  return (
    <div className="container section-padding">
      <ShopHeader pageTitle={getPageTitle()} />

      <ShopSidebar 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onSelectCategory={handleSelectCategory} 
      />

      <LoadingOrEmpty loading={loading} hasData={products.length > 0} emptyMessage="Không tìm thấy sản phẩm nào." />
      
      {!loading && products.length > 0 && (
        <ProductList products={products} searchKeyword={searchKeyword} />
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

export default ShopPage;
