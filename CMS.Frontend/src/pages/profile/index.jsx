import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Save } from 'lucide-react';
import axiosClient from '../../api/axiosClient';

function ProfilePage() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem('customerInfo'));
    if (!info) {
      navigate('/login');
      return;
    }
    setCustomer(info);
    setFullName(info.fullName || '');
    setPhone(info.phone || '');
    setAddress(info.address || '');
  }, [navigate]);

  const handleUpdate = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    
    axiosClient.put(`/customers/${customer.id}`, { fullName, phone, address })
      .then(res => {
        // Update local storage
        const updatedInfo = { ...customer, fullName, phone, address };
        localStorage.setItem('customerInfo', JSON.stringify(updatedInfo));
        window.dispatchEvent(new Event('storage'));
        
        setCustomer(updatedInfo);
        setMessage('Cập nhật thông tin thành công!');
        setLoading(false);
        setTimeout(() => setMessage(''), 3000);
      })
      .catch(err => {
        console.error(err);
        setMessage('Có lỗi xảy ra khi cập nhật.');
        setLoading(false);
      });
  };

  if (!customer) return null;

  return (
    <div className="container section-padding" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="card" style={{ padding: '30px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', backgroundColor: '#fff' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Thông Tin Cá Nhân</h2>
        
        {message && (
          <div style={{ padding: '10px', marginBottom: '20px', borderRadius: '8px', textAlign: 'center', backgroundColor: message.includes('thành công') ? '#dcfce7' : '#fee2e2', color: message.includes('thành công') ? '#166534' : '#991b1b' }}>
            {message}
          </div>
        )}

        <form onSubmit={handleUpdate}>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
              <Mail size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Email (Không thể thay đổi)
            </label>
            <input 
              type="email" 
              value={customer.email} 
              disabled 
              className="form-input"
              style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed', width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
              <User size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Họ và tên
            </label>
            <input 
              type="text" 
              required
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)}
              className="form-input"
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
              <Phone size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Số điện thoại
            </label>
            <input 
              type="text" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)}
              className="form-input"
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' }}>
              <MapPin size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              Địa chỉ
            </label>
            <textarea 
              value={address} 
              onChange={(e) => setAddress(e.target.value)}
              className="form-input"
              rows="3"
              style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', padding: '12px', backgroundColor: 'var(--primary, #c92127)', 
              color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
            }}
          >
            <Save size={20} />
            {loading ? 'Đang lưu...' : 'Lưu Thay Đổi'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
