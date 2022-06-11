import React, { useEffect } from "react";
import { connect } from "react-redux";
import Scroll from "../../components/scroll";
import Slider from "../../components/slider";
import RecommendList from "./list";
import { Content } from "./style";
import { mapStateToProps, mapDispatchToProps } from './utils'

function Recommend(props){

  const { getBannerDataDispatch, getRecommendDataDispatch } = props
  useEffect(()=>{
    getBannerDataDispatch()
    getRecommendDataDispatch()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {bannerList,recommendList} = props
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend))
