import React, { useRef } from "react";
import {CSSTransition} from 'react-transition-group';
import { getName } from "../../../api/utils";
import ProgressCircle from "../../../baseUI/ProgressCircle";
import { MiniPlayerContainer } from "./style";

function MiniPlayer(props){
  const {song,fullScreen,playing,percent} = props
  const {clickPlaying,handleShowList,toggleFullScreen} = props
  const playerRef = useRef()

  const renderPlayer = ()=>{
    return (
      <MiniPlayerContainer ref={playerRef}>
        <div className="icon" onClick={()=>toggleFullScreen && toggleFullScreen(true)}>
          <div className="imgWrapper">
            <img className={playing ? 'play' :'pause' } src={song.al.picUrl} alt="img" width="40px" height="40px"/>
          </div>
        </div>
        <div className="text">
          <h2 className="name"> {song.name} </h2>
          <p className="desc"> {getName(song.ar)} </p>
        </div>
        <div className="control">
          <ProgressCircle radius={32} percent={percent}>
           {
             playing ?<ion-icon name="pause-outline" onClick={e=>clickPlaying&&clickPlaying(e,false)}></ion-icon>
                    :  <ion-icon name="caret-forward-outline" onClick={e=>clickPlaying(e,true)}></ion-icon>
           }
          </ProgressCircle>
        </div>
        <div className="control" onClick={handleShowList}>
          <ion-icon name="musical-notes-outline"></ion-icon>
        </div>
    </MiniPlayerContainer>
    )
  }

  return (
    <CSSTransition 
    classNames="mini"
    in={!fullScreen}
    timeout={400}
    onEnter={()=>{ playerRef.current.style.display = "flex" }}
    onExited={()=>{ playerRef.current.style.display = "none" }}
    nodeRef={playerRef}
    mountOnEnter
  >
    { renderPlayer() }
  </CSSTransition>
    
  )
}

export default React.memo(MiniPlayer)
