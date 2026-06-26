import axiosClient from '../api/axiosClient';

export const orderService = {
  // Tạo đơn hàng mới
  createOrder: (payload) => {
    return axiosClient.post('/orders', payload);
  },

  // Lấy danh sách đơn hàng của khách hàng
  getCustomerOrders: (customerId) => {
    return axiosClient.get(`/orders/customer/${customerId}`);
  }
};
