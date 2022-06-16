import React, { useRef } from "react";
import {CSSTransition} from 'react-transition-group'
import { formatPlayTime, getName } from "../../../api/utils";
import { Bottom, CDWrapper, Middle, NormalPlayerContainer, Operators, ProgressWrapper, Top } from "./style";
import ProgressBar from "../../../baseUI/ProgressBar";
import { createAfterEnter, createAfterLeave, createEnter, createLeave } from "./animation";
import { PlayMode } from "../../../api/constant";

function NormalPlayer(props){

  const {song,playing,percent,duration,currentTime,fullScreen,mode} = props
  const {handlePre,handleNext,clickPlaying,toggleFullScreen,handleChangeMode,onProgressChange} = props
  const playerRef = useRef()
  const cdWrapperRef = useRef()

// 启用帧动画
  const enter =  createEnter(playerRef,cdWrapperRef)
  const afterEnter = createAfterEnter(cdWrapperRef)
  const leave = createLeave(cdWrapperRef)
  const afterLeave = createAfterLeave(playerRef,cdWrapperRef)

  const handleClickMode = ()=>{
    const currentModeIndex =( mode.index + 1) % 3
    const currentMode = Object.values(PlayMode).find(item=>item.index === currentModeIndex)
    handleChangeMode(currentMode)
  }

  let modeIconName = 'repeat-outline'
  if(mode === PlayMode.random){
    modeIconName = 'shuffle-outline'
  }else if(mode === PlayMode.sequence){
    modeIconName = 'reload-outline'
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
        <Middle ref={cdWrapperRef}>
          <CDWrapper>
            <div className="cd">
              <img className={`image ${playing ? 'play' :'pause'}`} src={`${song.al.picUrl}?param=400x400`} alt="cd"/>
            </div>
          </CDWrapper>
        </Middle>
        <Bottom className="bottom">
        <ProgressWrapper>
          <span className="time time-l">{ formatPlayTime(currentTime) } </span>
          <div className="progress-bar-wrapper">
            <ProgressBar percent={percent} updatePercent={onProgressChange}></ProgressBar>
          </div>
          <div className="time time-r">{ formatPlayTime(duration) } </div>
        </ProgressWrapper>
          <Operators>
            <div className="icon i-left" onClick={()=>handleClickMode()}>
              <ion-icon name={modeIconName}></ion-icon>
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
            <div className="icon i-right">
              <ion-icon name="list-circle-outline"></ion-icon>
            </div>
          </Operators>
        </Bottom>
    </NormalPlayerContainer>
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
