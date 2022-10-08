import { getHotKeyWords, getSuggestList, updateLoading } from './actionCreators';

export const mapStateToProps = (state) => ({
  loading: state.search.getIn(['loading']),
  hotList: state.search.getIn(['hotList']),
  suggestList: state.search.getIn(['suggestList']),
  songList: state.search.getIn(['songList']),
});

export const mapDispatchToProps = (dispatch) => ({
  getHotListDispatch() {
    dispatch(getHotKeyWords());
  },
  getSuggestListDispatch(data) {
    dispatch(getSuggestList(data));
  },
  updateLoadingDispatch(data) {
    dispatch(updateLoading(data));
  },
});
