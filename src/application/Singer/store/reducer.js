import { fromJS } from 'immutable';
import * as actionTypes from './constant';

const defaultState = fromJS({
  artist: {},
  hotSongs: [],
  loading: true,
});

const fn = (state, action) => {
  state = state || defaultState;
  switch (action.type) {
    case actionTypes.UPDATE_LOADING:
      return state.set('loading', action.data);
    case actionTypes.UPDATE_ARTIST_HOT_SONG:
      return state.set('hotSongs', action.data);
    case actionTypes.UPDATE_ARTIST_INFO:
      return state.set('artist', action.data);
    default:
      return state;
  }
};

export default fn;
