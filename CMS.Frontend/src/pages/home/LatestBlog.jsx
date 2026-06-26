import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import PostCard from '../../components/PostCard';

function LatestBlog({ posts, loadingPosts }) {
  return (
    <section className="section" style={{ marginTop: '40px' }}>
      <div className="section-header">
        <h2 className="section-title">Tin Tức</h2>
        <Link to="/posts" className="view-more">Xem tất cả <ChevronRight size={16} /></Link>
      </div>

      {loadingPosts ? (
        <p style={{ padding: '20px', textAlign: 'center' }}>Đang tải danh sách tin tức...</p>
      ) : posts.length === 0 ? (
        <p style={{ padding: '20px', textAlign: 'center' }}>Chưa có bài viết nào trong hệ thống.</p>
      ) : (
        <div className="news-grid">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}

export default LatestBlog;
