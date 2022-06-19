import React, { useCallback, useContext, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { GetCurrentPlayMode, getName, GetNextPlayMode } from "../../api/utils";
import { prefixStyle } from "../../api/utils/css";
import { CurrentIndexContext, SetCurrentPlayModeContext, ShowPlayListContext } from "../../application/Home";
import Scroll from "../scroll";
import { ListContent, ListHeader, PlayListWrapper, ScrollWrapper } from "./style";

function PlayList(props){
  const {show,playList,currentSong} = props
  const [isShow, setIsShow] = useState(false)
  const setShowPlayList = useContext(ShowPlayListContext)
  const setCurrentIndex = useContext(CurrentIndexContext)
  const playListRef = useRef()
  const wrapperRef = useRef()
  const transform= prefixStyle('transform')
  const onEnterCB = useCallback(()=>{
    setIsShow(true)
    wrapperRef.current.style[transform]=`translate3d(0,100%,0)`
  },[transform])

  const onEnteringCB = useCallback(()=>{
    wrapperRef.current.style['transition']=`all 0.3s`
    wrapperRef.current.style[transform]=`translate3d(0,0,0)`
  },[transform])

  const onExitingCB = useCallback(()=>{
    wrapperRef.current.style['transition']=`all 0.3s`
    wrapperRef.current.style[transform]=`translate3d(0,100%,0)`
  },[transform])

  const onExitedCB = useCallback(()=>{
    setIsShow(false)
    wrapperRef.current.style[transform]=`translate3d(0,100%,0)`
  },[transform])

  const currentMode = GetCurrentPlayMode() 
  const setCurrentPlayMode = useContext(SetCurrentPlayModeContext)

  const handleChangeMode = (e)=>{
    e.stopPropagation()
    const mode = GetNextPlayMode(currentMode)
    setCurrentPlayMode(mode)
  }

  const renderModeInfo = ()=>{
    return (
      <div onClick={(e)=>handleChangeMode(e)}> 
        <ion-icon name={currentMode.icon}></ion-icon> <span> {currentMode.desc} </span>
      </div>
    )
  }

  const renderCurrentIcon = (item)=>{
    const iconName = item.id === currentSong.id 
    return (
       <span className='current' >
       {
         iconName ? <ion-icon name='radio-outline'></ion-icon> : null
       }
       </span>
    )
  }

  const handleChangeSong = useCallback((e,index)=>{
    e.stopPropagation()
    setCurrentIndex(index)
  },[setCurrentIndex])

  const renderList = ()=>{
    return (
      <>
        <Scroll>
          <ListContent>
            {
              playList.map((item,index)=>{
                return (
                  <li className="item" key={item.id} onClick={e=>handleChangeSong(e,index)}>
                      { renderCurrentIcon(item) }
                    <span className="text"> 
                      {item.name} - {getName(item.ar)} 
                    </span>
                    <span className="like"> 
                       <ion-icon className='current' name='heart-circle-outline'></ion-icon>  
                    </span>
                    <span className="delete"> 
                      <ion-icon name="trash-outline"></ion-icon>
                    </span>
                  </li>
                )
              })
            }
          </ListContent>
        </Scroll>
      </>
    )
  }

  return (
    <CSSTransition 
    in={show} 
    timeout={300} 
    nodeRef={playListRef} 
    classNames="list-fade" 
    onEnter={onEnterCB}
    onEntering={onEnteringCB}
    onExiting={onExitingCB}
    onExited={onExitedCB}
    unmountOnExit>
      <PlayListWrapper ref={playListRef} 
      style={{display: isShow ? 'block' : 'none'}} 
      onClick={()=>{ setShowPlayList(false) }}>
        <div className="list_wrapper" ref={wrapperRef}>
          <ListHeader> 
              <h1> {renderModeInfo()} </h1>
          </ListHeader>
          <ScrollWrapper>
            { renderList() }
          </ScrollWrapper>
        </div>

      </PlayListWrapper>
    </CSSTransition>
  )
}

export default React.memo(PlayList)
