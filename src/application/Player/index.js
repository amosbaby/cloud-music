import React from "react";
import { getName } from "../../api/utils";
import MiniPlayer from "./miniPlayer";
import { Bottom, CDWrapper, Middle, NormalPlayerContainer, Operators, Top } from "./style";

function NormalPlayer(){

  const song = {
    al: { picUrl: "https://p1.music.126.net/JL_id1CFwNJpzgrXwemh4Q==/109951164172892390.jpg" },
    name: "木偶人",
    ar: [{name: "薛之谦"}]
  }

  return (
    <NormalPlayerContainer>
      <div className="background">
        <img src={song.al.picUrl} alt="歌曲图片" width="100%" height="100%"/>
      </div>
      <div className="background layer"></div>
      <Top> 
          <div className="back">
            <ion-icon name="chevron-down-outline"></ion-icon>
          </div>
          <h1 className="title"> {song.name} </h1>
          <h1 className="subtitle"> {getName(song.ar)} </h1>
      </Top>
      <Middle>
        <CDWrapper>
          <div className="cd">
            <img src={`${song.al.picUrl}?param=400x400`} alt="cd"/>
          </div>
        </CDWrapper>
      </Middle>
      <Bottom className="bottom">
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
    // <MiniPlayer song={currentSong}></MiniPlayer>
  )
}

export default React.memo(NormalPlayer)
