import axiosClient from '../api/axiosClient';

export const bannerService = {
  getActiveBanners: async () => {
    try {
      const response = await axiosClient.get('/advertisements');
      return response.data;
    } catch (error) {
      console.error("Error fetching banners:", error);
      return [];
    }
  }
};
