import React, {useRef} from "react"
import { useState } from "react"
import { Content, Menu, SongItem, SongList, TopDesc } from "./style"
import {CSSTransition} from 'react-transition-group'
import Header from "../../baseUI/Header"
import Scroll from "../../components/scroll"
import { currentAlbum } from "./mock.data"
import { formatPlayCount, getName } from "../../api/utils"

export function Album(props){
  const [showStatus,setShowStatus] = useState(true)

  const nodeRef = useRef()
  const handleBackClick = ()=>{
    setShowStatus(false)
  }


  return (

  <CSSTransition
      in={showStatus}  
      timeout={300} 
      classNames="fly" 
      appear={true} 
      unmountOnExit
      onExited={props.history.goBack}
      nodeRef={nodeRef}
    >
    
      <Content ref={nodeRef}>
         <Header   title={'返回'} handleClick={handleBackClick}></Header>
         <Scroll bounceTop={false}>
            <div>
                <TopDesc background={currentAlbum.coverImgUrl}>
                    <div className="background">
                      <div className="filter"></div>
                    </div>
                    <div className="img_wrapper">
                      <div className="decorate"></div>
                      <img src={currentAlbum.coverImgUrl} alt="album"/>
                      <div className="play_count">
                      <ion-icon name="play-circle-outline" className="play"></ion-icon>
                      <span className="count"> {formatPlayCount(currentAlbum.subscribedCount)} </span>
                      </div>
                    </div>
                    <div className="desc_wrapper">
                      <div className="title"> {currentAlbum.name} </div>
                      <div className="person">
                        <div className="avatar">
                          <img src={currentAlbum.creator.avatarUrl} alt="avatar"/>
                        </div>
                        <div className="name"> {currentAlbum.creator.nickname} </div>
                      </div>
                    </div>
                </TopDesc>
                <Menu>
                  <div>
                    <ion-icon name="chatbox-ellipses-outline"></ion-icon> 评论
                  </div>
                  <div>
                    <ion-icon name="thumbs-up-outline"></ion-icon> 点赞
                  </div>
                  <div>
                    <ion-icon name="star-outline"></ion-icon> 收藏
                  </div>
                  <div>
                    <ion-icon name="ellipsis-horizontal-outline"></ion-icon> 更多
                  </div>
                </Menu>
                <SongList>
                  <div className="first_line">
                    <div className="play_all">
                      <ion-icon name="play-circle-outline"></ion-icon>
                      <span> 播放全部 <span className="sum">(共{currentAlbum.tracks.length}首)</span> </span>
                    </div>
                    <div className="add_list">
                      <ion-icon name="star"></ion-icon>
                      <span> 收藏({formatPlayCount(currentAlbum.subscribedCount)}) </span>
                    </div>
                  </div>
              
                  <SongItem>
                    {
                      currentAlbum.tracks.map((item,index)=>{
                        return (
                          <li key={item.name+index}>
                            <span className="index"> {index+1} </span>
                            <div className="info"> 
                              <span> {item.name} </span>
                              <span>
                                { getName(item.ar)} - {item.al.name}
                              </span>
                             </div>
                          </li>
                        )
                      })
                    }
                  </SongItem>
                </SongList>
            </div>
         </Scroll>
      </Content> 
    
    </CSSTransition>
  )
}

export default React.memo(Album) 
