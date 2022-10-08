/**
 * 使用 useDispatch 与 useSelector代替
 */
import * as actionTypes from './store/actionCreators';

const mapStateToProps = (state) => ({
  // 勿在此处使用toJS，否则每次比较时都会不同
  bannerList: state.recommend.getIn(['bannerList']),
  recommendList: state.recommend.getIn(['recommendList']),
});

const mapDispatchToProps = (dispatch) => ({
  getBannerDataDispatch() {
    dispatch(actionTypes.getBannerList());
  },
  getRecommendDataDispatch() {
    dispatch(actionTypes.getRecommendList());
  },
});

export {
  mapDispatchToProps,
  mapStateToProps,
};
