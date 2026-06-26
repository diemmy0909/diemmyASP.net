import React from 'react';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';

const FALLBACK_POST_IMAGE = "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=400";
const BACKEND_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5188';

const getImageUrl = (url, fallback) => {
  if (!url) return fallback;
  if (url.startsWith('http')) return url;
  return `${BACKEND_URL}${url}`;
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN');
};

function PostCard({ post }) {
  return (
    <div className="news-card">
      <img
        src={getImageUrl(post.imageUrl, FALLBACK_POST_IMAGE)}
        alt={post.title}
        className="news-img"
      />
      <div className="news-content">
        <h3 className="news-title">{post.title}</h3>
        <p className="news-desc">Danh mục: {post.categoryName}</p>
        <span className="news-date">
          <Clock size={12} /> {formatDate(post.createdAt)}
        </span>
        <Link to={`/posts/${post.id}`} className="read-more" style={{ display: 'inline-block', marginTop: '10px', color: 'var(--primary)', fontWeight: 'bold' }}>
          Đọc tiếp →
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
