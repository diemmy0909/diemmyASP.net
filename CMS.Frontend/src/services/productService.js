import axiosClient from '../api/axiosClient';

export const productService = {
  // Lấy tất cả danh mục sản phẩm
  getCategories: () => {
    return axiosClient.get('/categoryproducts');
  },

  // Lấy danh sách sản phẩm (có phân trang, tìm kiếm)
  getProducts: (page = 1, pageSize = 12, search = '') => {
    let url = `/products?page=${page}&pageSize=${pageSize}`;
    if (search) url += `&search=${encodeURIComponent(search)}`;
    return axiosClient.get(url);
  },

  // Lấy sản phẩm theo danh mục
  getProductsByCategory: (categoryId, page = 1, pageSize = 12) => {
    return axiosClient.get(`/products/category/${categoryId}?page=${page}&pageSize=${pageSize}`);
  },

  // Lấy chi tiết một sản phẩm
  getProductById: (id) => {
    return axiosClient.get(`/products/${id}`);
  }
};
