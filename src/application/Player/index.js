import React, { useCallback, useEffect, useRef, useState } from "react";
import { getSongUrl } from "../../api/utils";
import MiniPlayer from "./miniPlayer";
import { MockPlayList } from "./mock.data";
import NormalPlayer from "./normalPlayer";

function Player(){
  const playList = MockPlayList
  const [fullScreen,setFullScreen] = useState(false)
  const [percent,setPercent] = useState(0)
  const [ playing,setPlaying ] = useState(false)
  const [ duration,setDuration ] = useState(0)
  const [ currentTime,setCurrentTime ] = useState(0)
  const [ currentSong,setCurrentSong ] = useState({})
  const [ currentIndex,setCurrentIndex ] = useState(-1)
  
  const audioRef = useRef()

  const clickPlaying = useCallback((event,state)=>{
    event.stopPropagation();
    setPlaying(state)
  },[])

  useEffect(()=>{
    if(!currentSong)return 
    setCurrentIndex(0)
    const current = playList[0]
    setCurrentSong(current)
    audioRef.current.src = getSongUrl(current.al.id)
    setTimeout(() => {
      audioRef.current.play() 
    });
    setPlaying(true)
    setCurrentTime(0)
    setDuration(current.dt/1000 | 0)
  },[])

  useEffect(()=>{
    playing ? audioRef.current.play() : audioRef.current.pause()
  },[playing])

  const updateTime = (event)=>{
    setCurrentTime(event.target.currentTime)
  }

  const onProgressChange = (percent) =>{
    const time = duration * percent
    setCurrentTime(time)
    setPercent(percent)
    audioRef.current.currentTime = time
    if(!playing){
      setPlaying(true)
    }
  }

  return (
    <>
      {
        currentSong.al ? <>
        <NormalPlayer percent={percent} duration={duration} currentTime={currentTime} playing={playing} fullScreen={fullScreen} toggleFullScreen={setFullScreen} song={currentSong} clickPlaying={clickPlaying} onProgressChange={onProgressChange}>
              </NormalPlayer>
            <MiniPlayer percent={percent}  duration={duration} currentTime={currentTime} playing={playing} fullScreen={fullScreen} toggleFullScreen={setFullScreen}  song={currentSong} clickPlaying={clickPlaying}> </MiniPlayer>
        </> : null
      }
      <audio ref={audioRef} onTimeUpdate={updateTime}></audio>
    </>
  )
}

export default React.memo(Player)
