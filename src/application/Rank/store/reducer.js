import { fromJS } from "immutable";
import * as actionTypes from "./constant";

const defaultState = fromJS({
  rankList: [],
  loading: true
})

const reducer = (state=defaultState, action) => {
  switch(action.type){
    case actionTypes.UPDATE_RANK_LIST:
      return state.set('rankList', action.data)
    case actionTypes.UPDATE_LOADING:
      return state.set('loading',action.data)
    default:
      return state
  }
}

export { reducer }
