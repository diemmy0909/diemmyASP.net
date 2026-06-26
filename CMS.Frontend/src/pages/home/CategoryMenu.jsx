import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, Smartphone, Laptop, Headphones, Watch, Home, Plug, Monitor, Tv, Package, Percent, Newspaper
} from 'lucide-react';

const getCategoryIcon = (name) => {
  if (!name) return <ChevronRight size={18} />;
  const lowerName = name.toLowerCase();
  if (lowerName.includes('điện thoại') || lowerName.includes('tablet') || lowerName.includes('smart')) return <Smartphone size={18} />;
  if (lowerName.includes('laptop') || lowerName.includes('macbook')) return <Laptop size={18} />;
  if (lowerName.includes('âm thanh') || lowerName.includes('tai nghe') || lowerName.includes('loa') || lowerName.includes('mic')) return <Headphones size={18} />;
  if (lowerName.includes('đồng hồ') || lowerName.includes('camera')) return <Watch size={18} />;
  if (lowerName.includes('gia dụng') || lowerName.includes('làm đẹp') || lowerName.includes('nhà')) return <Home size={18} />;
  if (lowerName.includes('phụ kiện') || lowerName.includes('chuột') || lowerName.includes('phím') || lowerName.includes('cáp') || lowerName.includes('sạc')) return <Plug size={18} />;
  if (lowerName.includes('màn hình') || lowerName.includes('pc') || lowerName.includes('máy tính') || lowerName.includes('máy in')) return <Monitor size={18} />;
  if (lowerName.includes('tivi') || lowerName.includes('điện máy') || lowerName.includes('tv')) return <Tv size={18} />;
  if (lowerName.includes('khuyến mãi') || lowerName.includes('sale') || lowerName.includes('deal')) return <Percent size={18} />;
  if (lowerName.includes('tin tức') || lowerName.includes('công nghệ') || lowerName.includes('báo')) return <Newspaper size={18} />;
  return <Package size={18} />; // Default
};

function CategoryMenu({ categories, loadingCategories }) {
  return (
    <div className="sidebar-menu">
      {loadingCategories ? (
        <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>Đang tải...</div>
      ) : categories.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>Chưa có danh mục</div>
      ) : (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <Link to={`/products?category=${category.id}`} className="sidebar-item-left" style={{ textDecoration: 'none', color: 'inherit', flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="sidebar-icon">{getCategoryIcon(category.name)}</span>
                <span className="sidebar-text">{category.name}</span>
              </Link>
              <ChevronRight size={16} className="sidebar-arrow" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryMenu;
