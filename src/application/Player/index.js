import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { PlayMode } from "../../api/constant";
import { getRandomInt, getSongUrl } from "../../api/utils";
import { CurrentIndexContext } from "../Home";
import MiniPlayer from "./miniPlayer";
import NormalPlayer from "./normalPlayer";

function Player(props){
  const {playList, currentIndex} = props
  const [fullScreen,setFullScreen] = useState(false)
  const [percent,setPercent] = useState(0)
  const [ playing,setPlaying ] = useState(false)
  const [ duration,setDuration ] = useState(0)
  const [ playMode,setPlayMode ] = useState(PlayMode.sequence)
  const [ currentTime,setCurrentTime ] = useState(0)
  const [ currentSong,setCurrentSong ] = useState({})


  const setCurrentIndex = useContext(CurrentIndexContext)
  
  
  
  const audioRef = useRef()

  const clickPlaying = useCallback((event,state)=>{
    event.stopPropagation();
    setPlaying(state)
  },[])


  useEffect(()=>{
    const current = playList && playList[currentIndex]
    if(!current) return
    setCurrentSong(current||{})
    
    setCurrentTime(0)
    setPercent(0)
    setPlaying(true)
    setDuration(current.dt/1000 | 0)
    setTimeout(() => {
        audioRef.current.src = getSongUrl(current.id)
        // audioRef.current.play()
    });
  },[playList,currentIndex])



  // useEffect(()=>{
  //   const current = playList && playList[currentIndex]
  //   if(!current)return 
    
    
  //   audioRef.current.src = getSongUrl(current.al.id)
  //   setTimeout(() => {
  //     audioRef.current.play() 
  //   });
  //   setCurrentTime(0)
  //   setPercent(0)
  //   setDuration(current.dt/1000 | 0)
  // },[])

  useEffect(()=>{
    setTimeout(() => {
      playing ? audioRef.current.play() : audioRef.current.pause()  
    });
  },[playing])

  const updateTime = (event)=>{
    setCurrentTime(event.target.currentTime)
    setPercent(event.target.currentTime/duration)
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

  const onAudioError = ()=>{
    handleNext()
  }

  const handleLoop = ()=>{
    audioRef.current.currentTime = 0
    setCurrentTime(0)
    setPercent(0)
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
    handleLoop()
  }

  const handleNext = ()=>{
    if(playList.length === 1){
      handleLoop()
      return
    }
    const total = playList.length
    let index

    switch(playMode){
      case PlayMode.loop:
        index = currentIndex === total - 1 ? 0 : currentIndex + 1
        break
      case PlayMode.random:
        index = getRandomInt(0, total - 1)
        break
      case PlayMode.sequence:
        index = Math.min(currentIndex + 1,total - 1)
        break
      default:
        index = total - 1
        break
    }

    if(!playing){
      setPlaying(true)
    }
    setCurrentIndex(index)
    handleLoop()
  }

  const handlePlayEnded = ()=>{
    setPlaying(false)
    setPercent(0)
    handleNext() 
  }

  const handlePlay=(e)=>{
    console.log('handlePlay',e)
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
      <audio autoPlay ref={audioRef} onTimeUpdate={updateTime} onEnded={handlePlayEnded} onError={onAudioError} onPlay={handlePlay}></audio>
    </>
  )
}

export default React.memo(Player)
