import { combineReducers } from "redux";
import { reducer as recommendReducer } from "../application/Recommend/store";
import { reducer as singerReducer } from "../application/Singers/store";
import { reducer as rankReducer } from "../application/Rank/store"
import { reducer as albumReducer } from "../application/Album/store"
import {reducer as artistReducer} from "../application/Singer/store"
import { reducer as searchReducer } from "../application/Search/store";

export default combineReducers({
  // 之后开发具体功能模块的时候添加reducer
  recommend: recommendReducer,
  singers: singerReducer,
  rank: rankReducer,
  album: albumReducer,
  artist: artistReducer,
  search: searchReducer
})
