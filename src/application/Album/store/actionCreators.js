import { fromJS } from 'immutable'
import { getAlbumDetailRequest } from '../../../api/request'
import * as actionTypes from './constant'

export const updateAlbumDetail = (data) => ({
  type: actionTypes.UPDATE_ALBUM_DETAIL,
  data: fromJS(data)
})

export const updateLoadingStatus = (data)=>({
  type: actionTypes.UPDATE_LOADING_STATUS,
  data
})

export const getAlbumDetail = (id) => {
  return (dispatch) => {
    getAlbumDetailRequest(id).then(res=>{
      dispatch(updateAlbumDetail(res.playlist))
      dispatch(updateLoadingStatus(false))
    })
  }
}
