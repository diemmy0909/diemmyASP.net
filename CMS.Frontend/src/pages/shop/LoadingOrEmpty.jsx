import React from 'react';

function LoadingOrEmpty({ loading, hasData, emptyMessage = "Không có dữ liệu." }) {
  if (loading) {
    return <p className="state-msg">Đang tải dữ liệu...</p>;
  }
  
  if (!hasData) {
    return <p className="state-msg">{emptyMessage}</p>;
  }

  return null;
}

export default LoadingOrEmpty;
