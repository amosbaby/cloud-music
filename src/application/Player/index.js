import React, { useCallback, useEffect, useRef, useState } from "react";
import { PlayMode,PlayMode2 } from "../../api/constant";
import { getRandomInt, getSongUrl } from "../../api/utils";
import MiniPlayer from "./miniPlayer";
import { MockPlayList } from "./mock.data";
import NormalPlayer from "./normalPlayer";

function Player(){
  const playList = MockPlayList
  const [fullScreen,setFullScreen] = useState(false)
  const [percent,setPercent] = useState(0)
  const [ playing,setPlaying ] = useState(false)
  const [ duration,setDuration ] = useState(0)
  const [ playMode,setPlayMode ] = useState(PlayMode.sequence)
  const [ currentTime,setCurrentTime ] = useState(0)
  const [ currentSong,setCurrentSong ] = useState({})
  const [ currentIndex,setCurrentIndex ] = useState(0)
  
  const audioRef = useRef()

  const clickPlaying = useCallback((event,state)=>{
    event.stopPropagation();
    setPlaying(state)
  },[])

  useEffect(()=>{
    const current = playList[currentIndex]
    if(!current)return 
    
    setCurrentSong(current)
    audioRef.current.src = getSongUrl(current.al.id)
    // setTimeout(() => {
    //   audioRef.current.play() 
    // });
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

  const handleLoop = ()=>{
    audioRef.current.currentTime = 0
    setCurrentTime(0)
    audioRef.current.play()
  }

  const handlePre = ()=>{
    if(playList.length === 1){
      handleLoop()
      return
    }
    
    let index

    switch(playMode){
      case PlayMode.loop:
        index = currentIndex < 1 ? playList.length - 1 : currentIndex - 1
        break
      case PlayMode.random:
        index = getRandomInt(0, playList.length - 1)
        break
      case PlayMode.sequence:
        index = Math.max(0, currentIndex - 1)
        break
      default:
        index = 0
        break
    }

    if(!playing){
      setPlaying(true)
    }
    setCurrentIndex(index)
  }

  const handleNext = ()=>{
    if(playList.length === 1){
      handleLoop()
      return
    }

    let index

    switch(playMode){
      case PlayMode.loop:
        index = currentIndex === playList.length - 1 ? 0 : currentIndex + 1
        break
      case PlayMode.random:
        index = getRandomInt(0, playList.length - 1)
        break
      case PlayMode.sequence:
        index = Math.min(currentIndex - 1,playList - 1)
        break
      default:
        index = playList - 1
        break
    }

    if(!playing){
      setPlaying(true)
    }
    setCurrentIndex(index)
  }

  return (
    <>
      {
        currentSong.al ? <>
        <NormalPlayer mode={playMode}  percent={percent} duration={duration} currentTime={currentTime} playing={playing} fullScreen={fullScreen} toggleFullScreen={setFullScreen} song={currentSong} clickPlaying={clickPlaying} onProgressChange={onProgressChange} handlePre={handlePre} handleNext={handleNext} handleChangeMode={setPlayMode}>
              </NormalPlayer>
            <MiniPlayer percent={percent}  duration={duration} currentTime={currentTime} playing={playing} fullScreen={fullScreen} toggleFullScreen={setFullScreen}  song={currentSong} clickPlaying={clickPlaying}> </MiniPlayer>
        </> : null
      }
      <audio ref={audioRef} onTimeUpdate={updateTime}></audio>
    </>
  )
}

export default React.memo(Player)
