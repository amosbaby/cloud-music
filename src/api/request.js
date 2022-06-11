import { axiosInstance } from "./config";

/**
 * 获取banner列表
 */
export const getBannerListRequest = () => {
  return axiosInstance.get('/banner')
}

/**
 * 获取推荐列表
 */
 export const getRecommendListRequest = () => {
  return axiosInstance.get('/personalized')
}
