import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { blogService } from '../../services/blogService';
import PostCard from '../../components/PostCard';
import BlogSidebar from './BlogSidebar';

function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    blogService.getPosts(currentPage, 6)
      .then(res => { 
        setPosts(res.data.items || []); 
        setTotalPages(res.data.totalPages || 1);
        setLoading(false); 
      })
      .catch(err => { console.error(err); setLoading(false); });
  }, [currentPage]);

  return (
    <div className="container section-padding" style={{ display: 'flex', gap: '30px' }}>
      
      <div style={{ flex: 1 }}>
        <h1 className="page-title">Tin Tức</h1>

        {loading ? (
          <p className="state-msg">Đang tải tin tức...</p>
        ) : posts.length === 0 ? (
          <p className="state-msg">Chưa có bài viết nào.</p>
        ) : (
          <div className="news-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {posts.map(post => (
              <PostCard key={post.id} post={post} />
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

      <div style={{ width: '300px' }}>
        <BlogSidebar />
      </div>
    </div>
  );
}

export default BlogPage;
