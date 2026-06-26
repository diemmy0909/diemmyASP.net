import React from 'react';

function BlogSidebar() {
  return (
    <div className="blog-sidebar" style={{ padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
      <h3 style={{ marginBottom: '15px', color: '#333' }}>Danh mục tin tức</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}><a href="#" style={{ color: '#555', textDecoration: 'none' }}>Khuyến mãi</a></li>
        <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}><a href="#" style={{ color: '#555', textDecoration: 'none' }}>Công nghệ mới</a></li>
        <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}><a href="#" style={{ color: '#555', textDecoration: 'none' }}>Mẹo vặt</a></li>
        <li style={{ padding: '8px 0' }}><a href="#" style={{ color: '#555', textDecoration: 'none' }}>Review sản phẩm</a></li>
      </ul>
    </div>
  );
}

export default BlogSidebar;
