import { fromJS } from 'immutable';
import {
  UPDATE_ENTER_LOADING, UPDATE_PAGE_INDEX, UPDATE_PULL_DOWN_LOADING, UPDATE_PULL_UP_LOADING, UPDATE_SINGER_LIST,
} from './constant';

const defaultState = fromJS({
  singerList: [],
  pageIndex: 0, // 当前页数
  enterLoading: true, // 入场动画状态
  pullDownLoading: false, // 下拉刷新
  pullUpLoading: false, // 上拉加载
});

const fn = (state, action) => {
  state = state || defaultState;
  switch (action.type) {
    case UPDATE_SINGER_LIST:
      return state.set('singerList', action.data);
    case UPDATE_PAGE_INDEX:
      return state.set('pageIndex', action.data);
    case UPDATE_ENTER_LOADING:
      return state.set('enterLoading', action.data);
    case UPDATE_PULL_DOWN_LOADING:
      return state.set('pullDownLoading', action.data);
    case UPDATE_PULL_UP_LOADING:
      return state.set('pullUpLoading', action.data);
    default:
      return state;
  }
};

export default fn;
