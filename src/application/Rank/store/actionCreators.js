import { fromJS } from 'immutable';
import { getRankListRequest } from '../../../api/request';
import * as actionTypes from './constant';

/**
 * 更新页面加载状态
 * @param {boolean} data
 * @returns
 */
export const updateLoading = (data) => ({
  type: actionTypes.UPDATE_LOADING,
  data,
});

/**
 * 更新榜单页面数据
 * @param {Object} data
 * @returns
 */
export const updateRankList = (data) => ({
  type: actionTypes.UPDATE_RANK_LIST,
  data: fromJS(data),
});

/**
 * 获取榜单列表
 * @returns
 */
export const getRankList = () => (dispatch) => {
  getRankListRequest().then((res) => {
    dispatch(updateRankList(res.list || []));
    dispatch(updateLoading(false));
  });
};
