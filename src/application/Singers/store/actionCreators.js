import { fromJS } from "immutable";
import { getSignerListRequest, getTopSingerListRequest } from "../../../api/request";
import * as actionTypes from "./constant";

/**
 * 更新页面数据
 * @param {Object} data 
 * @returns 
 */
export const updateSingerList = (data)=>({
  type: actionTypes.UPDATE_SINGER_LIST,
  data: fromJS(data)
})
/**
 * 更新页面下标
 * @param {number} data 
 * @returns 
 */
export const updatePageIndex = (data)=>({
  type: actionTypes.UPDATE_PAGE_INDEX,
  data
})
/**
 * 更新进入loading
 * @param {boolean} data 
 * @returns 
 */
export const updateEnterLoading = (data)=>({
  type: actionTypes.UPDATE_ENTER_LOADING,
  data
})
/**
 * 更新下拉刷新
 * @param {boolean} data 
 * @returns 
 */
export const updatePullDownLoading = (data)=>({
  type: actionTypes.UPDATE_PULL_DOWN_LOADING,
  data
})
/**
 * 更新上拉加载
 * @param {boolean} data 
 * @returns 
 */
export const updatePullUpLoading = (data)=>({
  type: actionTypes.UPDATE_PULL_UP_LOADING,
  data
})

/**
 * 获取热门歌手
 * @returns 
 */
export const getHotSingerList = (offset = 0) => {
  return (dispatch)=>{
    getTopSingerListRequest(offset).then(res=>{
      dispatch(updateSingerList(res.artists));
      dispatch(updateEnterLoading(false))
      dispatch(updatePullDownLoading(false))
    }).catch(err=>console.log('热门歌手数据获取失败!',err))
  }
}

export const getMoreHotSingerList = ()=>{
  return (dispatch,getState)=>{
    const offset = getState().getIn(['singers','pageIndex'])
    const singerList = getState().getIn(['singers','singerList']).toJS()
    getTopSingerListRequest(offset).then(res=>{
      dispatch(updateSingerList([...singerList,...res.artists]));
      dispatch(updateEnterLoading(false))
      dispatch(updatePullDownLoading(false))
    }).catch(err=>console.log('热门歌手数据获取失败!',err))
  }
}

/**
 * 获取歌手列表
 * @param {string} category 
 * @param {string} alpha 
 * @param {string} offset 
 * @returns 
 */
export const getSingerList = (type,area,alpha,offset=0) => {
  return (dispatch)=>{
    getSignerListRequest(type,area,alpha,offset).then(res=>{
      dispatch(updateSingerList(res.artists));
      dispatch(updateEnterLoading(false))
      dispatch(updatePullDownLoading(false))
    }).catch(err=>console.log('歌手数据获取失败!',err))
  }
}

export const getMoreSingerList = (type,area,alpha) => {
  return (dispatch,getState)=>{
    const offset = getState().singers.getIn(['pageIndex'])
    const singerList = getState().singers.getIn(['singerList'])?.toJS()
    getSignerListRequest(type,area,alpha,offset).then(res=>{
      dispatch(updateSingerList([...singerList,...res.artists]));
      dispatch(updateEnterLoading(false))
      dispatch(updatePullUpLoading(false))
    }).catch(err=>console.log('歌手数据获取失败!',err))
  }
}
