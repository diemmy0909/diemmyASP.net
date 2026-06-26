import React from 'react';

function ProductInfo({ product, quantity, setQuantity, addToCart }) {
  const formatPrice = (price) =>
    new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

  return (
    <div className="product-detail-info">
      <div className="product-detail-category">{product.categoryName}</div>
      <h1 className="product-detail-name">{product.name}</h1>
      <div className="product-detail-price">{formatPrice(product.price)}</div>
      <div className="product-detail-stock">
        {product.stockQuantity > 0 
          ? `✓ Còn hàng (${product.stockQuantity} sản phẩm)` 
          : <span style={{color: '#dc3545'}}>❌ Hết hàng</span>}
      </div>
      <div className="product-detail-desc">
        {product.description || 'Sản phẩm chất lượng cao, đảm bảo nguồn gốc xuất xứ rõ ràng.'}
      </div>

      {/* Quantity */}
      <div className="qty-control">
        <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))} disabled={product.stockQuantity === 0}>−</button>
        <span className="qty-value">{product.stockQuantity === 0 ? 0 : quantity}</span>
        <button className="qty-btn" onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))} disabled={product.stockQuantity === 0}>+</button>
      </div>

      <button 
        className="btn-add-cart" 
        onClick={addToCart}
        disabled={product.stockQuantity === 0}
        style={{ 
          backgroundColor: product.stockQuantity === 0 ? '#ccc' : 'var(--primary)',
          cursor: product.stockQuantity === 0 ? 'not-allowed' : 'pointer'
        }}
      >
        {product.stockQuantity === 0 ? '❌ Hết Hàng' : '🛒 Thêm vào giỏ hàng'}
      </button>
    </div>
  );
}

export default ProductInfo;
