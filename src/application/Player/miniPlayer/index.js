import React from "react";
import { getName } from "../../../api/utils";
import { MiniPlayerContainer } from "./style";

function MiniPlayer(props){
  const {song} = props

  return (
    <MiniPlayerContainer>
      <div className="icon">
        <div className="imgWrapper">
          <img src={song.al.picUrl} alt="img" width="40px" height="40px"/>
        </div>
      </div>
      <div className="text">
        <h2 className="name"> {song.name} </h2>
        <p className="desc"> {getName(song.ar)} </p>
      </div>
      <div className="control">
        <ion-icon name="stop-circle-outline"></ion-icon>
      </div>
      <div className="control">
        <ion-icon name="musical-notes-outline"></ion-icon>
      </div>
      
    </MiniPlayerContainer>
  )
}

export default React.memo(MiniPlayer)
