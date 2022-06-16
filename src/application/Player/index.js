import React, { useCallback, useState } from "react";
import MiniPlayer from "./miniPlayer";
import NormalPlayer from "./normalPlayer";

function Player(){
  const [fullScreen,setFullScreen] = useState(false)
  const [ playing,setPlaying ] = useState(false)
  const song = {
    al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
    name: "木偶人",
    ar: [{name: "薛之谦"}]
  }

  const clickPlaying = useCallback((event,state)=>{
    event.stopPropagation();
    setPlaying(state)
  },[])

  return (
    <>
      <NormalPlayer playing={playing} fullScreen={fullScreen} toggleFullScreen={setFullScreen} song={song} clickPlaying={clickPlaying}>
        </NormalPlayer>
      <MiniPlayer playing={playing} fullScreen={fullScreen} toggleFullScreen={setFullScreen}  song={song} clickPlaying={clickPlaying}> </MiniPlayer>
    </>
  )
}

export default React.memo(Player)
