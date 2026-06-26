import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../api';

function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    api.get(`/posts?page=${currentPage}&pageSize=6`)
      .then(res => { 
        setPosts(res.data.items || []); 
        setTotalPages(res.data.totalPages || 1);
        setLoading(false); 
      })
      .catch(err => { console.error(err); setLoading(false); });
  }, [currentPage]);

  const getImg = (url) => {
    if (!url) return null;
    return url.startsWith('http') ? url : `http://localhost:5188${url}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('vi-VN');
  };

  return (
    <div className="container section-padding">
      <h1 className="page-title">Tin Tức</h1>

      {loading ? (
        <p className="state-msg">Đang tải tin tức...</p>
      ) : posts.length === 0 ? (
        <p className="state-msg">Chưa có bài viết nào.</p>
      ) : (
        <div className="posts-grid">
          {posts.map(post => (
            <div key={post.id} className="post-card">
              {getImg(post.imageUrl) ? (
                <img src={getImg(post.imageUrl)} alt={post.title} />
              ) : (
                <div className="post-card-img-placeholder">Không có ảnh</div>
              )}
              <div className="post-card-body">
                <div className="post-card-category">{post.categoryName}</div>
                <h3 className="post-card-title">{post.title}</h3>
                <div className="post-card-footer">
                  <span className="post-card-date">🕐 {formatDate(post.createdAt)}</span>
                  <Link to={`/posts/${post.id}`} className="read-more-link">Đọc tiếp →</Link>
                </div>
              </div>
            </div>
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

export default PostsPage;
