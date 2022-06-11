import React from "react";
import Scroll from "../../components/scroll";
import Slider from "../../components/slider";
import RecommendList from "./list";
import { Content } from "./style";
function Recommend(props){
  const bannerList = [1,2,3,4].map(item=>{
    return {
      id:item,
      imageUrl:'http://p1.music.126.net/ZYLJ2oZn74yUz5x8NBGkVA==/109951164331219056.jpg'
    }
  })

  const recommendList = Array(100).fill(null).map((_,index)=>{
    return {
      id:index+1,
      picUrl:"https://p1.music.126.net/fhmefjUfMD-8qtj3JKeHbA==/18999560928537533.jpg",
      playCount: Math.random()*1000000,
      name:"朴树、许巍、李健、郑钧、老狼、赵雷"
    }
  })

  return (
    <Content> 
      <Scroll className="list">
        <div>
          <Slider bannerList={bannerList}/>  
          <RecommendList recommendList={recommendList}></RecommendList>
        </div>
      </Scroll>
    </Content>
  )
}

export default React.memo(Recommend)
