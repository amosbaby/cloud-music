import { fromJS } from 'immutable'
import { getArtistRequest } from '../../../api/request'
import * as actionTypes from './constant'

export const updateLoading = (data)=>({
  type: actionTypes.UPDATE_LOADING,
  data
})

export const updateArtist = (data)=>({
  type:actionTypes.UPDATE_ARTIST_INFO,
  data:fromJS(data)
})

export const updateHotSongs = (data)=>({
  type:actionTypes.UPDATE_ARTIST_HOT_SONG,
  data:fromJS(data)
})

export const getArtist = (id) => {
  return (dispatch)=>{
    getArtistRequest(id).then(res=>{
      dispatch(updateArtist(res.artist))
      dispatch(updateHotSongs(res.hotSongs))
      dispatch(updateLoading(false))
    })
  }
}
