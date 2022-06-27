import React, { useContext, useEffect, useRef } from "react";
import {CSSTransition} from 'react-transition-group'
import { formatPlayTime, getName, GetNextPlayMode } from "../../../api/utils";
import { Bottom, CDWrapper, LyricContainer, LyricWrapper, Middle, NormalPlayerContainer, Operators, ProgressWrapper, SpeedButton, SpeedButtonList, Top } from "./style";
import ProgressBar from "../../../baseUI/ProgressBar";
import { createAfterEnter, createAfterLeave, createEnter, createLeave } from "./animation";
import {  SetCurrentPlayModeContext } from "../../Home";
import Scroll from "../../../components/scroll";
import { PlaySpeed } from "../../../api/constant";

function NormalPlayer(props){

  const {song,playing,percent,duration,currentTime,fullScreen,mode,speed} = props
  const {handleShowList,handlePre,handleNext,clickPlaying,toggleFullScreen,onProgressChange,handleChangeSpeed} = props
  const {currentLyric,playingLyric,currentLyricIndex} = props

  const currentModeRef = useRef('cd')
  const playerRef = useRef()
  const cdWrapperRef = useRef()
  const lyricScrollRef = useRef()
  const lyricCssNodeRef = useRef()
  const cdCssNodeRef = useRef()
  const lyricLineRef = useRef([])

// 启用帧动画
  const enter =  createEnter(playerRef,cdWrapperRef)
  const afterEnter = createAfterEnter(cdWrapperRef)
  const leave = createLeave(cdWrapperRef)
  const afterLeave = createAfterLeave(playerRef,cdWrapperRef,currentModeRef)

  const setCurrentPlayMode = useContext(SetCurrentPlayModeContext)

  const handleClickMode = ()=>{
    const currentMode = GetNextPlayMode(mode)
    setCurrentPlayMode(currentMode)
  }

  const toggleModeChange = (event)=>{
    // event.stopPropagation()
    console.log('toggleModeChange:',event)
    currentModeRef.current  =  currentModeRef.current === 'cd' ? 'lyric' :'cd'
  }

  useEffect(()=>{
    const bScroll = lyricScrollRef.current?.getBScroll()
    if(!bScroll)return
   
    if(currentLyricIndex>5){
      // 保持当前歌词在第 5 条的位置
      let lineEl = lyricLineRef.current[currentLyricIndex - 5].current;
      bScroll.scrollToElement(lineEl, 1000);
    }else {
      // 当前歌词行数 <=5, 直接滚动到最顶端
      bScroll.scrollTo(0, 0, 1000);
    }

  },[currentLyricIndex])

  const renderSpeedButtons = ()=>{
    return (
      <SpeedButtonList>
        <span> 倍速听歌 </span>
        {
          PlaySpeed.map(item=>{
            return (
              <SpeedButton key={item} className={`${speed === item ? 'selected' : ''}`} onClick={(e)=>{ handleChangeSpeed(e,item) }}> {`x${item}`} </SpeedButton>
            )
          })
        }
      </SpeedButtonList>
    )
  }

  const renderLyric = ()=>{
    return (
      <CSSTransition in={currentModeRef.current === 'lyric'} timeout={300}  classNames="fade" nodeRef={lyricCssNodeRef}>
        <LyricContainer ref={lyricCssNodeRef}>
          <Scroll ref={lyricScrollRef}>
              <LyricWrapper className="lyric_wrapper" style={{visibility: currentModeRef.current === 'lyric' ? 'visible' :'hidden' }}>
                {
                  currentLyric ? currentLyric.lines.map((item,index)=>{
                    // 拿到每一行的歌词dom
                    lyricLineRef.current[index] = React.createRef()
                    return (
                      <p className={`text ${currentLyricIndex === index ? 'current' : ''}`} key={item+index} ref={lyricLineRef.current[index]}> {item.text} </p>
                    )
                  }) : <p className="text pure"> 纯音乐，请欣赏。</p>
                }
              </LyricWrapper>
          </Scroll>
        </LyricContainer>
      </CSSTransition>
    )
  }

  const renderPlayer = ()=> {
    return (
      <NormalPlayerContainer ref={playerRef}>
        <div className="background">
          <img src={song.al.picUrl} alt="歌曲图片" width="100%" height="100%"/>
        </div>
        <div className="background layer"></div>
        <Top className="top"> 
            <div className="back" onClick={()=>toggleFullScreen && toggleFullScreen(false)}>
              <ion-icon name="chevron-down-outline"></ion-icon>
            </div>
            <h1 className="title"> {song.name} </h1>
            <h1 className="subtitle"> {getName(song.ar)} </h1>
        </Top>
        <Middle ref={cdWrapperRef}  onClick={(e)=>toggleModeChange(e)}>
            {renderCD()}
            {renderLyric()}
        </Middle>
        <Bottom className="bottom">
          { renderSpeedButtons() }
        <ProgressWrapper>
          <span className="time time-l">{ formatPlayTime(currentTime) } </span>
          <div className="progress-bar-wrapper">
            <ProgressBar percent={percent} updatePercent={onProgressChange}></ProgressBar>
          </div>
          <div className="time time-r">{ formatPlayTime(duration) } </div>
        </ProgressWrapper>
          <Operators>
            <div className="icon i-left" onClick={()=>handleClickMode()}>
              <ion-icon name={mode.icon}></ion-icon>
            </div>
            <div className="icon i-left" onClick={handlePre}>
              <ion-icon name="play-skip-back-outline"></ion-icon>
            </div>
            <div className="icon i-center">
              {
                playing ? <ion-icon name="pause-circle-outline" onClick={e=>clickPlaying(e,false)}></ion-icon>
                        : <ion-icon name="caret-forward-circle-outline" onClick={e=>clickPlaying(e,true)}></ion-icon>
              }
            </div>
            <div className="icon i-right" onClick={handleNext}>
              <ion-icon name="play-skip-forward-outline"></ion-icon>
            </div>
            <div className="icon i-right" onClick={handleShowList}>
              <ion-icon name="list-circle-outline"></ion-icon>
            </div>
          </Operators>
        </Bottom>
    </NormalPlayerContainer>
    )
  }

  const renderCD = ()=>{
    return (
      <CSSTransition in={currentModeRef.current === 'cd'} timeout={300}  classNames="fade" nodeRef={cdCssNodeRef}>
        <CDWrapper ref={cdCssNodeRef} style={{visibility: currentModeRef.current === 'cd' ? 'visible' :'hidden' }}>
        {/* 可旋转needle */}
        <div className={`needle ${playing ? '' : 'pause'}`}></div>
        <div className="cd">
          <img className={`image ${playing ? 'play' :'pause'}`} src={`${song.al.picUrl}?param=400x400`} alt="cd"/>
          
        </div>
        <p className="playing_lyric"> {playingLyric} </p>
    </CDWrapper>
    </CSSTransition>
    )
  }

  return (   
    <CSSTransition 
      classNames="normal"
      in={fullScreen}
      timeout={400}
      onEnter={()=>enter()}
      onEntered={()=>afterEnter()}
      onExited={()=>afterLeave()}
      onExit={()=>leave()}
      nodeRef={playerRef}
      mountOnEnter
    >
      { renderPlayer() }
    </CSSTransition>
  )
}
export default React.memo(NormalPlayer)
