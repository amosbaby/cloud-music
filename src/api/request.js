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

/**
 * 获取热门歌手列表
 * @param {number} offset 当前位置
 * @returns 
 */
export const getTopSingerListRequest = (offset) => {
  return axiosInstance.get(`/top/artists?offset=${offset}`)
}

/**
 * 获取歌手列表
 * @param {string} category 分类
 * @param {string} alpha 首字母
 * @param {number} offset 当前位置
 * @returns 
 */
export const getSignerListRequest = (type,area, alpha, offset,initial=30) => {
  return axiosInstance.get(`/artist/list?type=${type}&area=${area}&initial=${alpha.toLowerCase()}&offset=${offset}`)
}

/**
 * 调用此接口,可获取所有榜单内容摘要
 */
export const getRankListRequest = () => {
  return axiosInstance.get('/toplist/detail')
}

/**
 * 获取album详情
 * @param {string} id album 的id
 * @returns 
 */
export const getAlbumDetailRequest = (id) => {
  return axiosInstance.get(`/playlist/detail?id=${id}`)
}
