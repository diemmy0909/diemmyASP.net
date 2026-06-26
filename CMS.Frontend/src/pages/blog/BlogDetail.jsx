import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogService } from '../../services/blogService';

const BACKEND_URL = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5188';

function BlogDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    blogService.getPostById(id)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const getImg = (url) => {
    if (!url) return null;
    return url.startsWith('http') ? url : `${BACKEND_URL}${url}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  if (!post) return <p className="state-msg">Đang tải bài viết...</p>;

  return (
    <div className="container section-padding">
      <div className="post-detail-wrapper">
        <Link to="/posts" className="back-link">← Quay lại danh sách tin tức</Link>

        <div className="post-detail-card">
          <div className="post-card-category">{post.categoryName}</div>
          <h1 className="post-detail-title">{post.title}</h1>
          <div className="post-detail-meta">
            🕐 Đăng ngày: {formatDate(post.createdAt)}
          </div>

          {getImg(post.imageUrl) && (
            <img
              src={getImg(post.imageUrl)}
              alt={post.title}
              className="post-detail-img"
            />
          )}

          <div
            className="post-detail-content"
            dangerouslySetInnerHTML={{ __html: post.content || '<p>Nội dung đang được cập nhật...</p>' }}
          />
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
