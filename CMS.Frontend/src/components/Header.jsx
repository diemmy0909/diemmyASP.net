import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, MapPin } from 'lucide-react';
import '../App.css';

function Header() {
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState(() =>
    JSON.parse(localStorage.getItem('customerInfo'))
  );
  const [cartCount, setCartCount] = useState(0);
  const [searchText, setSearchText] = useState('');

  const refreshCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartCount(cart.reduce((t, i) => t + i.quantity, 0));
  };

  useEffect(() => {
    refreshCart();
    const handler = () => {
      refreshCart();
      setCustomerInfo(JSON.parse(localStorage.getItem('customerInfo')));
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('customerInfo');
    setCustomerInfo(null);
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchText.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchText)}`);
    } else {
      navigate(`/products`);
    }
  };

  return (
    <>
      {/* Top Header */}
      <header className="header f-header">
        <div className="container">
          <div className="header-top f-header-top">
            
            {/* Fahasa Style Logo */}
            <Link to="/" className="f-brand">
              {"DIEMMYCMS".split('').map((letter, index) => (
                <span key={index} className="f-brand-letter">{letter}</span>
              ))}
            </Link>

            <form className="search-bar f-search-bar" onSubmit={handleSearch}>
              <input
                type="text"
                className="search-input"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button type="submit" className="search-btn f-search-btn">
                <Search size={20} />
              </button>
            </form>

            <div className="header-actions f-header-actions">
              {customerInfo ? (
                <div className="action-item user-dropdown-wrapper f-action-item">
                  <User size={22} color="#c92127" />
                  <span style={{ color: '#333' }}>{customerInfo.fullName?.split(' ').pop()}</span>
                  
                  <div className="user-dropdown">
                    <div className="user-dropdown-header">
                      <strong>{customerInfo.fullName}</strong>
                      <small>{customerInfo.email || 'Thành viên'}</small>
                    </div>
                    <ul className="user-dropdown-list">
                      <li><Link to="/profile">Thông tin cá nhân</Link></li>
                      <li><Link to="/orders">Đơn hàng</Link></li>
                      <li><button onClick={handleLogout}>Đăng xuất</button></li>
                    </ul>
                  </div>
                </div>
              ) : (
                <Link to="/login" className="action-item f-action-item">
                  <User size={22} color="#c92127" />
                  <span style={{ color: '#333' }}>Đăng nhập</span>
                </Link>
              )}

              <Link to="/cart" className="f-cart-btn">
                <div style={{ position: 'relative' }}>
                  <ShoppingCart size={20} />
                  {cartCount > 0 && <span className="cart-badge f-cart-badge">{cartCount}</span>}
                </div>
                <span>Giỏ Hàng</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav-bottom f-nav-bottom">
        <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
          
          <ul className="nav-list f-nav-list">
            <li><Link to="/">HOME</Link></li>
            <li><Link to="/products">SẢN PHẨM</Link></li>
            <li><Link to="/promotions">KHUYẾN MÃI</Link></li>
            <li><Link to="/posts">TIN TỨC</Link></li>
            <li><Link to="/about">VỀ CHÚNG TÔI</Link></li>
            {!customerInfo && <li><Link to="/register">ĐĂNG KÝ</Link></li>}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;
