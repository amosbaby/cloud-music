import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Scroll from "../../components/scroll";
import Slider from "../../components/slider";
import RecommendList from "./list";
import { Content } from "./style";
import * as actionTypes from './store/actionCreators'


function Recommend(props){

  // const { getBannerDataDispatch, getRecommendDataDispatch } = props
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(actionTypes.getBannerList())
    dispatch(actionTypes.getRecommendList())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // const {bannerList,recommendList} = props
  const bannerList = useSelector((state) => {
    return state.recommend.getIn(['bannerList'])
  })
  const recommendList = useSelector((state) => {
    return state.recommend.getIn(['recommendList'])
  })

  const bannerListJS = bannerList ? bannerList.toJS() : []
  const recommendListJS = recommendList ? recommendList.toJS() : []


  return (
    <Content> 
      <Scroll className="list">
        <div>
          <Slider bannerList={bannerListJS}/>  
          <RecommendList recommendList={recommendListJS}></RecommendList>
        </div>
      </Scroll>
    </Content>
  )
}

export default React.memo(Recommend)
