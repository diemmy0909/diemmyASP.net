import React from 'react';
import ProductCard from '../../components/ProductCard';

function ProductList({ products, searchKeyword }) {
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchKeyword.toLowerCase()) || 
    (p.categoryName && p.categoryName.toLowerCase().includes(searchKeyword.toLowerCase()))
  );

  if (filteredProducts.length === 0) {
    return <p className="state-msg">Không tìm thấy sản phẩm nào.</p>;
  }

  return (
    <div className="f-product-grid" style={{ gap: '20px', padding: 0 }}>
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
