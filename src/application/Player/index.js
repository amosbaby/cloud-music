import React from "react";
import MiniPlayer from "./miniPlayer";

function Player(){

  const currentSong = {
    al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
    name: "木偶人",
    ar: [{name: "薛之谦"}]
  }

  return (
    <MiniPlayer song={currentSong}></MiniPlayer>
  )
}

export default React.memo(Player)
