import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Scroll from "../../components/scroll";
import Slider from "../../components/slider";
import RecommendList from "./list";
import { Content } from "./style";
import * as actionTypes from './store/actionCreators'
import {forceCheck} from 'react-lazyload'
import Loading from "../../components/loading";
import { renderRoutes } from "react-router-config";
import { ShouldAddBottom } from "../../api/utils";

function Recommend(props){
  const bannerList = useSelector((state) => {
    return state.recommend.getIn(['bannerList'])
  })
  const recommendList = useSelector((state) => {
    return state.recommend.getIn(['recommendList'])
  })

  const dispatch = useDispatch()
  useEffect(()=>{
    // 如果页面有数据则不发起请求。使用的是immutable数据结构中的size属性
    if(!bannerList.size){
      dispatch(actionTypes.getBannerList())
    }
    if(!recommendList.size){
      dispatch(actionTypes.getRecommendList())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadingStatus = useSelector((state) => {
    return state.recommend.getIn(['loadingStatus'])
  })

  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []

  const addBottom = ShouldAddBottom()

  return (
    <Content addBottom={addBottom}> 
      { loadingStatus ? <Loading> </Loading> :  <Scroll className="list" onScroll={forceCheck}>
        <div>
          <Slider bannerList={bannerListJS}/>  
          <RecommendList recommendList={recommendListJS} ></RecommendList>
        </div>
      </Scroll> }
     
      { renderRoutes(props.route.routes) }
    </Content>
  )
}

export default React.memo(Recommend)
