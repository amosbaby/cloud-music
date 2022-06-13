import { combineReducers } from "redux";
import { reducer as recommendReducer } from "../application/Recommend/store";
import { reducer as singerReducer } from "../application/Singers/store";
export default combineReducers({
  // 之后开发具体功能模块的时候添加reducer
  recommend: recommendReducer,
  singers: singerReducer
})
