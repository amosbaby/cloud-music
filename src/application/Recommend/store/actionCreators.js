import { fromJS } from 'immutable';
import * as actionTypes from './constant';
import { getBannerListRequest, getRecommendListRequest } from '../../../api/request';

export const updateBannerList = (data) => ({
  type: actionTypes.UPDATE_BANNER,
  data: fromJS(data),
});

export const updateRecommendList = (data) => ({
  type: actionTypes.UPDATE_RECOMMEND_LIST,
  data: fromJS(data),
});

export const updateLoadingStatus = (data) => ({
  type: actionTypes.UPDATE_LOADING_STATUS,
  data,
});

export const getBannerList = () => (dispatch) => {
  getBannerListRequest().then((res) => {
    dispatch(updateBannerList(res.banners));
  }).catch(() => {
    console.log('轮播图数据传输错误');
  });
};

export const getRecommendList = () => (dispatch) => {
  getRecommendListRequest().then((res) => {
    dispatch(updateRecommendList(res.result));
    dispatch(updateLoadingStatus(false));
  }).catch(() => {
    console.log('推荐列表数据传输错误');
  });
};
