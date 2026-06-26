import axiosClient from '../api/axiosClient';

export const blogService = {
  // Lấy danh sách bài viết (có phân trang)
  getPosts: (page = 1, pageSize = 6) => {
    return axiosClient.get(`/posts?page=${page}&pageSize=${pageSize}`);
  },

  // Lấy chi tiết bài viết
  getPostById: (id) => {
    return axiosClient.get(`/posts/${id}`);
  }
};
