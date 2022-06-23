import { fromJS } from 'immutable'
import { getHotKeyWordsRequest, getResultSongsListRequest, getSuggestListRequest } from '../../../api/request'
import * as actionTypes  from './constants'

export const updateLoading = (data) => ({
  type: actionTypes.UPDATE_LOADING,
  data: fromJS(data)
})

export const updateHotList = (data) => ({
  type: actionTypes.UPDATE_HOT_LIST,
  data: fromJS(data)
})

export const updateSongList = (data) => ({
  type: actionTypes.UPDATE_RESULT_SONG_LIST,
  data: fromJS(data)
})

export const updateSuggestList = (data) => ({
  type: actionTypes.UPDATE_SUGGEST_LIST,
  data: fromJS(data)
})


export const getHotKeyWords = ()=>{
  return dispatch=>{
    getHotKeyWordsRequest().then(res=>{
      dispatch(updateHotList(res.result.hots))
    })
  }
}

export const getSuggestList = (keyword)=>{
  return dispatch =>{
    getSuggestListRequest(keyword).then(res=>{
      dispatch(updateSuggestList(res?.result || []))
    })

    getResultSongsListRequest(keyword).then(res=>{
      dispatch(updateSongList(res?.result.songs||[]))
      dispatch(updateLoading(false))
    })


  }
}
