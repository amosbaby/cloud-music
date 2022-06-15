import React, { useState } from "react";
import MiniPlayer from "./miniPlayer";
import NormalPlayer from "./normalPlayer";

function Player(){
  const [fullScreen,setFullScreen] = useState(false)
  const song = {
    al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
    name: "木偶人",
    ar: [{name: "薛之谦"}]
  }
  return (
    <>
      <NormalPlayer fullScreen={fullScreen} toggleFullScreen={setFullScreen} song={song}>
        </NormalPlayer>
      <MiniPlayer  fullScreen={fullScreen} toggleFullScreen={setFullScreen}  song={song}> </MiniPlayer>
    </>
  )
}

export default React.memo(Player)
