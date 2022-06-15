import React, { useRef } from "react";
import {CSSTransition} from 'react-transition-group'
import animations from "create-keyframe-animation";


import { getName } from "../../../api/utils";
import { Bottom, CDWrapper, Middle, NormalPlayerContainer, Operators, ProgressWrapper, Top } from "./style";
import { prefixStyle } from "../../../api/utils/css";
import ProgressBar from "../../../baseUI/ProgressBar";

function NormalPlayer(props){

  const {song,fullScreen,toggleFullScreen} = props
  const playerRef = useRef()
  const cdWrapperRef = useRef()

// 启用帧动画
  const enter = () => {
    playerRef.current.style.display = "block";
    const { x, y, scale } = _getPosAndScale();// 获取 miniPlayer 图片中心相对 normalPlayer 唱片中心的偏移
    let animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
      },
      60: {
        transform: `translate3d(0, 0, 0) scale(1.1)`
      },
      100: {
        transform: `translate3d(0, 0, 0) scale(1)`
      }
    };
    animations.registerAnimation ({
      name: "move",
      animation,
      presets: {
        duration: 400,
        easing: "linear"
      }
    });
    animations.runAnimation(cdWrapperRef.current, "move");
  };

  const transform = prefixStyle("transform")
  const leave = ()=>{
    if(!cdWrapperRef.current) return
    const cdWrapperDom = cdWrapperRef.current
    cdWrapperDom.style.transition = "all 0.4s"
    const {x,y,scale} = _getPosAndScale()
    cdWrapperDom.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
  }
  const afterLeave = ()=>{
    if(!cdWrapperRef.current) return
    const cdWrapperDom = cdWrapperRef.current
    cdWrapperDom.style.transition = ""
    cdWrapperDom.style[transform] = ""
    // 一定要注意现在要把 normalPlayer 这个 DOM 给隐藏掉，因为 CSSTransition 的工作只是把动画执行一遍。不置为 none 现在全屏播放器页面还是存在
    playerRef.current.style.display = "none"
  }

  // 计算偏移的辅助函数
  const _getPosAndScale = () => {
    const targetWidth = 40;
    const paddingLeft = 40;
    const paddingBottom = 30;
    const paddingTop = 80;
    const width = window.innerWidth * 0.8;
    const scale = targetWidth /width;
    // 两个圆心的横坐标距离和纵坐标距离
    const x = -(window.innerWidth/ 2 - paddingLeft);
    const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
    return {
      x,
      y,
      scale
    };
  };
  const afterEnter = () => {
    // 进入后解绑帧动画
    const cdWrapperDom = cdWrapperRef.current;
    animations.unregisterAnimation ("move");
    cdWrapperDom.style.animation = "";
  };

  // const afterExited = () => {
  //   playerRef.current.style.display = "none"
  // }

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
              <img src={`${song.al.picUrl}?param=400x400`} alt="cd"/>
            </div>
          </CDWrapper>
        </Middle>
        <Bottom className="bottom">
        <ProgressWrapper>
          <span className="time time-l">0:00</span>
          <div className="progress-bar-wrapper">
            <ProgressBar percent={0.2}></ProgressBar>
          </div>
          <div className="time time-r">4:17</div>
        </ProgressWrapper>
          <Operators>
            <div className="icon i-left">
              <ion-icon name="repeat-outline"></ion-icon>
            </div>
            <div className="icon i-left">
              <ion-icon name="play-skip-back-outline"></ion-icon>
            </div>
            <div className="icon i-center">
              <ion-icon name="pause-circle-outline"></ion-icon>
            </div>
            <div className="icon i-right">
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
