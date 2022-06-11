import * as actionTypes from './constant';
import { fromJS } from 'immutable';

const defaultState = fromJS({
  bannerList:[],
  recommendList:[]
})

const fn = (state=defaultState,action)=>{
  switch(action.type){
    case actionTypes.UPDATE_BANNER:
        return state.set('bannerList',action.data)
    case actionTypes.UPDATE_RECOMMEND_LIST:
      return state.set('recommendList',action.data)
    default:
      return  state
  }
}

export default fn
