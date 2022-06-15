import React, { useCallback, useEffect, useRef, useState } from "react"
import Header from "../../baseUI/Header"
import { BgLayer, CollectButton, Container, ImgWrapper, SongListWrapper } from "./style"
import {CSSTransition} from 'react-transition-group'
import SongList from "../SongList"
import Scroll from "../../components/scroll"
import { HEADER_HEIGHT } from "../../api/constant"

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
  // 图片初始高度
  const initialHeight = useRef(0)
  // 往上偏移的尺寸，露出圆角
  const OFFSET = 5

  useEffect(()=>{
    const height = imageWrapperRef.current.offsetHeight 
    songScrollWrapperRef.current.style.top = `${height - OFFSET}px`
    initialHeight.current = height
    // 把遮罩先放在下面，以裹住歌曲列表
    layerRef.current.style.top = `${height - OFFSET}px`
    songScrollRef.current.refresh()
  },[])


  const handleScroll = useCallback(pos =>{
    const currentY = pos.y
    const height = initialHeight.current
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT

    // 滑动距离占图片高度的比率
    const percent = Math.abs(currentY / height)

    if(currentY > 0){
      // 下拉时放大图片，按钮随着移动
      imageWrapperRef.current.style["transform"] = `scale(${1+percent})`
      collectButtonRef.current.style["transform"] = `translate3d(0,${currentY}px,0)`
      layerRef.current.style.top = `${height- OFFSET + currentY}px`
    }else if(currentY >= minScrollY){
       // 上移时缩小图片，按钮随着移动
       imageWrapperRef.current.style["transform"] = `scale(${1-percent})`
       imageWrapperRef.current.style.zIndex = 1
       imageWrapperRef.current.style.paddingTop = "75%"
       imageWrapperRef.current.style.height = 0
       collectButtonRef.current.style["transform"] = `translate3d(0,${currentY}px,0)`
       collectButtonRef.current.style["opacity"] = `${1 - percent *2}`
       layerRef.current.style.top = `${height- OFFSET - Math.abs(currentY)}px`
       layerRef.current.style.zIndex = 1
    }else if(currentY < minScrollY){
      layerRef.current.style.top = `${HEADER_HEIGHT - OFFSET}px`
      layerRef.current.style.zIndex = 1
      // 防止溢出的歌单内容遮住header
      headerRef.current.style.zIndex = 100
      // 此时图片高度与header一致
      imageWrapperRef.style.height = `${HEADER_HEIGHT}px`
      imageWrapperRef.style.paddingTop = 0
      imageWrapperRef.style.zIndex = 99

    }
  },[]
)
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
          <Scroll ref={songScrollRef} onScroll={handleScroll}>
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
    },   {
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
    ,   {
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
    },   {
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
    },   {
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
    },   {
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
    },   {
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
    },   {
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
    },   {
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
    },   {
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
    },   {
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
