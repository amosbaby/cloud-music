import { getHotSingerList, getMoreHotSingerList, getMoreSingerList, getSingerList, updateEnterLoading, updatePageIndex, updatePullDownLoading, updatePullUpLoading } from "./actionCreators"

export const mapStateToProps = (state)=>({
  singerList: state.singers.getIn(['singerList']),
  pageIndex: state.singers.getIn(['pageIndex']),
  enterLoading: state.singers.getIn(['enterLoading']),
  pullDownLoading: state.singers.getIn(['pullDownLoading']),
  pullUpLoading: state.singers.getIn(['pullUpLoading']),
})

export const mapDispatchToProps = (dispatch) =>{
  return {
    getHotSingerDispatch(){
      dispatch(getHotSingerList())
    },
    getSingerListDispatch(category,alpha){
      dispatch(updatePageIndex(0))
      dispatch(updateEnterLoading(true))
      dispatch(getSingerList(category.type,category.area,alpha))
    },
    pullUpRefreshDispatch(category,alpha,isHot=false,offset=0){
      dispatch(updatePullUpLoading(true))
      dispatch(updatePageIndex(offset+1))
      if(isHot){
        dispatch(getMoreHotSingerList())
      }else{
        dispatch(getMoreSingerList(category.type,category.area,alpha))
      }
    },
    pullDownRefreshDispatch(category,alpha,isHot=false){
      dispatch(updatePullDownLoading(true))
      dispatch(updatePageIndex(0))
      if(isHot){
        dispatch(getMoreHotSingerList())
      }else{
        dispatch(getMoreSingerList(category.type,category.area,alpha))
      }
    }
  }
}
