import React from 'react';

function ShopSidebar({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="filter-bar">
      <button
        className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
        onClick={() => onSelectCategory('all')}
      >
        Tất cả
      </button>
      {categories.map(cat => (
        <button
          key={cat.id}
          className={`filter-btn ${selectedCategory === cat.id ? 'active' : ''}`}
          onClick={() => onSelectCategory(cat.id)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

export default ShopSidebar;
