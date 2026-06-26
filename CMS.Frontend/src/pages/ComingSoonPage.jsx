import React from 'react';
import { Link } from 'react-router-dom';

function ComingSoonPage({ title = 'Trang này' }) {
  return (
    <div style={{
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
      padding: '40px 20px',
      textAlign: 'center',
    }}>
      {/* Icon */}
      <div style={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #d70018, #ff6b6b)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '28px',
        boxShadow: '0 8px 32px rgba(215,0,24,0.25)',
        animation: 'pulse 2s infinite',
      }}>
        <span style={{ fontSize: '42px' }}>🔧</span>
      </div>

      <h1 style={{
        fontSize: '32px',
        fontWeight: '700',
        color: '#1a1a2e',
        marginBottom: '12px',
      }}>
        {title}
      </h1>

      <p style={{
        fontSize: '18px',
        color: '#555',
        marginBottom: '8px',
        fontWeight: '500',
      }}>
        Chúng tôi đang hoàn thiện trang này
      </p>

      <p style={{
        fontSize: '14px',
        color: '#888',
        marginBottom: '36px',
        maxWidth: '420px',
        lineHeight: '1.6',
      }}>
        Đội ngũ phát triển đang nỗ lực hoàn thiện nội dung tốt nhất cho bạn. 
        Vui lòng quay lại sau nhé! 🌟
      </p>

      {/* Progress bar */}
      <div style={{
        width: '280px',
        height: '6px',
        background: '#e2e8f0',
        borderRadius: '999px',
        overflow: 'hidden',
        marginBottom: '36px',
      }}>
        <div style={{
          height: '100%',
          width: '65%',
          background: 'linear-gradient(90deg, #d70018, #ff6b6b)',
          borderRadius: '999px',
          animation: 'loading 2s ease-in-out infinite alternate',
        }} />
      </div>

      <Link to="/" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        background: '#d70018',
        color: 'white',
        padding: '12px 28px',
        borderRadius: '30px',
        textDecoration: 'none',
        fontWeight: '600',
        fontSize: '14px',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: '0 4px 16px rgba(215,0,24,0.3)',
      }}
        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
      >
        ← Quay về Trang chủ
      </Link>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.08); }
        }
        @keyframes loading {
          0% { width: 45%; }
          100% { width: 80%; }
        }
      `}</style>
    </div>
  );
}

export default ComingSoonPage;
