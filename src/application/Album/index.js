import React, {useEffect, useRef} from "react"
import { useState } from "react"
import { Content, Menu, SongItem, SongList, TopDesc } from "./style"
import {CSSTransition} from 'react-transition-group'
import Header from "../../baseUI/Header"
import Scroll from "../../components/scroll"
import { formatPlayCount, getName } from "../../api/utils"
import GlobalStyle from "../../assets/global-style"
import { useDispatch, useSelector } from "react-redux"
import { getAlbumDetail } from "./store/actionCreators"
import Loading from "../../components/loading"

const HEADER_HEIGHT = 45

export function Album(props){
  const [showStatus,setShowStatus] = useState(true)
  const [title,setTitle] = useState('歌单')
  const [ isMarquee, setIsMarquee ] = useState(false) // 是否显示跑马灯
  const headerRef = useRef()
  const loading = useSelector((state)=>{
    return state.album.getIn(['loading'])
  })
  const currentAlbumState = useSelector((state)=>{
    return state.album.getIn(['albumDetail'])
  })
  const currentAlbum = currentAlbumState ? currentAlbumState.toJS() : {}

  const dispatch = useDispatch()
  useEffect(()=>{
    if(!currentAlbumState.size || currentAlbum.id !== props.match.params.id ){
      dispatch(getAlbumDetail(props.match.params.id))
    }
  },[])

  const nodeRef = useRef() // CSSTransition用于引用子组件
  const handleBackClick = ()=>{
    setShowStatus(false)
  }

  const handleScroll = (position) => {
    const minScrollY = -HEADER_HEIGHT
    const percent = Math.abs(position.y/minScrollY)
    const headerDom = headerRef.current
    // 滑过顶部的高度开始变化
    if(position.y < minScrollY){
      headerDom.style.backgroundColor = GlobalStyle["theme-color"]
      headerDom.style.opacity = Math.min(1,(percent-1)/2)
      setTitle(currentAlbum.name)
      setIsMarquee(true)
    }else{
      headerDom.style.backgroundColor = ''
      headerDom.style.opacity = 1
      setTitle('歌单')
      setIsMarquee(false)
    }
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
         <Header ref={headerRef}  title={title} isMarquee={isMarquee} handleClick={handleBackClick}></Header>
        { loading ? <Loading></Loading> :
         <Scroll bounceTop={false} onScroll={handleScroll}>
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
          }
      </Content> 
    
    </CSSTransition>
  )
}

export default React.memo(Album) 
