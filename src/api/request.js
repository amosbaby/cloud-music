import { axiosInstance } from './config';

/**
 * 获取banner列表
 */
export const getBannerListRequest = () => axiosInstance.get('/banner');

/**
 * 获取推荐列表
 */
export const getRecommendListRequest = () => axiosInstance.get('/personalized');

/**
 * 获取热门歌手列表
 * @param {number} offset 当前位置
 * @returns
 */
export const getTopSingerListRequest = (offset) => axiosInstance.get(`/top/artists?offset=${offset}`);

/**
 * 获取歌手列表
 * @param {string} category 分类
 * @param {string} alpha 首字母
 * @param {number} offset 当前位置
 * @returns
 */
export const getSignerListRequest = (type, area, alpha, offset) => axiosInstance.get(`/artist/list?type=${type}&area=${area}&initial=${alpha.toLowerCase()}&offset=${offset}`);

/**
 * 调用此接口,可获取所有榜单内容摘要
 */
export const getRankListRequest = () => axiosInstance.get('/toplist/detail');

/**
 * 获取album详情
 * @param {string} id album 的id
 * @returns
 */
export const getAlbumDetailRequest = (id) => axiosInstance.get(`/playlist/detail?id=${id}`);

/**
 * 获取歌手信息
 * @param {string} id 歌手id
 * @returns
 */
export const getArtistRequest = (id) => axiosInstance.get(`/artists?id=${id}`);

/**
 * 获取歌词
 * @param {string} id 歌曲id
 * @returns
 */
export const getLyricRequest = (id) => axiosInstance.get(`/lyric?id=${id}`);

/**
 * 获取热门关键词
 * @returns
 */
export const getHotKeyWordsRequest = () => axiosInstance.get('/search/hot');

/**
 * 获取关键词建议列表
 * @param {string} keywords
 * @returns
 */
export const getSuggestListRequest = (keywords) => axiosInstance.get(`/search/suggest?keywords=${keywords}`);

/**
 * 根据关键词查询对应的歌曲列表
 * @param {string} keywords
 * @returns
 */
export const getResultSongsListRequest = (keywords) => axiosInstance.get(`/search?keywords=${keywords}`);

/**
 * 获取歌曲详情
 * @param {string} id
 * @returns
 */
export const getSongDetailRequest = (id) => axiosInstance.get(`/song/detail?ids=${id}`);
