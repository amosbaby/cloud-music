import { fromJS } from 'immutable'
import * as actionTypes from './constant'

const defaultState = fromJS({
  albumDetail: {},
  loading: true
})

const fn = (state=defaultState,action) => {
  switch(action.type){
    case actionTypes.UPDATE_ALBUM_DETAIL:
      return state.set('albumDetail',action.data)
    case actionTypes.UPDATE_LOADING_STATUS:
        return state.set('loading',action.data)
    default:
      return state
  }
}
export default fn
