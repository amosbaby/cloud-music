import React from "react";
import { formatPlayCount } from "../../../api/utils";
import { List, ListItem, ListWrapper } from "./style";

function RecommendList(props){
  const {recommendList} = props

  const list = recommendList.map(item=>{
    return (
      <ListItem key={item.id}>
        <div className="img_wrapper">
          <div className="decorate"></div>
          {/* 加参数可减小请求的图片资源大小 */}
          <img src={item.picUrl+"?param=300x300"} alt="music"/>
          <div className="play-count">
          <ion-icon name="play-circle-outline" className="play"></ion-icon>
          <span className="count"> {formatPlayCount(item.playCount)} </span>
          </div>
        </div>
      </ListItem>
    )
  })

  return (
    <ListWrapper>
      <h1 className="title"> 推荐歌单 </h1>
      <List> 
        {list}
      </List>
    </ListWrapper>
  )

}

export default RecommendList
