import { fromJS } from 'immutable'
import * as actionTypes  from './constants'

const defaultState = fromJS({
  loading:true,
  hotList:[],
  suggestList:[],
  songList:[],
})

export default function reducer (state=defaultState,action){
  switch(action.type){
    case actionTypes.UPDATE_LOADING:
      return state.set('loading',action.data)
    case actionTypes.UPDATE_HOT_LIST:
      return state.set('hotList',action.data)
    case actionTypes.UPDATE_SUGGEST_LIST:
      return state.set('suggestList',action.data)
    case actionTypes.UPDATE_RESULT_SONG_LIST:
      return state.set('songList',action.data)
    default:
      return state
  }
}
