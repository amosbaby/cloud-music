import React, { useCallback, useEffect, useRef, useState } from "react"
import Header from "../../baseUI/Header"
import { BgLayer, CollectButton, Container, ImgWrapper, SongListWrapper } from "./style"
import {CSSTransition} from 'react-transition-group'
import SongList from "../SongList"
import Scroll from "../../components/scroll"

function Singer(props){
  const [showStatus, setShowStatus] = useState(true)
  const nodeRef = useRef()

  const handleBackClick = useCallback(()=>{
    setShowStatus(false)
  },[])

  const collectButtonRef = useRef()
  const imageWrapperRef = useRef()
  const songScrollWrapperRef = useRef()
  const songScrollRef = useRef()
  const headerRef = useRef()
  const layerRef =useRef()
  // 往上偏移的尺寸，露出圆角
  const OFFSET = 5

  useEffect(()=>{
    const height = imageWrapperRef.current.offsetHeight 
    songScrollWrapperRef.current.style.top = `${height - OFFSET}px`
    // 把遮罩先放在下面，以裹住歌曲列表
    layerRef.current.style.top = `${height - OFFSET}px`
    songScrollRef.current.refresh()
  },[])

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
      <Container ref={nodeRef}>
        <Header ref={headerRef} title={artist.name} handleClick={()=> handleBackClick()}></Header>
        <ImgWrapper ref={imageWrapperRef} bgUrl={artist.picUrl}> 
          <div className="filter"></div>
        </ImgWrapper>
        <CollectButton ref={collectButtonRef}>
          <ion-icon name="star" ></ion-icon>
          <span className="text"> 收藏 </span>
        </CollectButton>
        <BgLayer ref={layerRef}></BgLayer>
        <SongListWrapper ref={songScrollWrapperRef}>
          <Scroll ref={songScrollRef}>
            <SongList songs={artist.hotSongs} collectCount={artist.subscribedCount} showCollect={false}></SongList>
          </Scroll>
        </SongListWrapper>
      </Container>
    </CSSTransition>
  )
}

export default React.memo(Singer)


export const artist = {
  picUrl: "https://p2.music.126.net/W__FCWFiyq0JdPtuLJoZVQ==/109951163765026271.jpg",
  name: "薛之谦",
  subscribedCount: 1111111,
  hotSongs: [
    {
      name: "我好像在哪见过你",
      ar: [{name: "薛之谦"}],
      al: {
        name: "薛之谦专辑"
      }
    },
    {
      name: "我好像在哪见过你",
      ar: [{name: "薛之谦"}],
      al: {
        name: "薛之谦专辑"
      }
    }
  ]
};
