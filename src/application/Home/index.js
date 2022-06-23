import React, {  useEffect, useState } from "react";
import { renderRoutes } from "react-router-config";
import { NavLink } from "react-router-dom";
import { PlayMode } from "../../api/constant";
import PlayList from "../../components/play-list";
import Player from "../Player";
import { Tab, TabItem, Top } from "./style";
import { cloneDeep } from 'lodash'


export const HasMiniPlayerContext = React.createContext(false)
export const PlayListContext = React.createContext()
export const ShowPlayListContext = React.createContext(false)
export const CurrentIndexContext= React.createContext()
export const CurrentPlayModeContext = React.createContext()
export const SetCurrentPlayModeContext = React.createContext()
export const DeleteSongIndexContext = React.createContext()

function Home(props){

  const [playList,setPlayList] = useState([])
  const [deleteSongIndex,setDeleteSongIndex] = useState(-1)
  const [currentMode,setCurrentPlayMode] = useState(PlayMode.sequence)
  const [showPlayList,setShowPlayList] = useState(false)
  const [currentIndex,setCurrentIndex] = useState(0)
  const hasMiniPlayer = playList && playList.length > 0

  useEffect(()=>{
    // 防止逻辑漏盘
    if(deleteSongIndex>=0 &&deleteSongIndex !== currentIndex ){
      const list = cloneDeep(playList)
      const newList = list.slice(0,deleteSongIndex).concat(list.slice(deleteSongIndex+1))

      if(deleteSongIndex < currentIndex){
        setCurrentIndex(currentIndex - 1)
      }

       setPlayList(newList)
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[deleteSongIndex])

  const renderHome = ()=>{
    return (
      <>
        <Top>
        <span> <ion-icon name="grid-outline"></ion-icon> </span>
        <span> 网易云音乐 </span>
        <span className="search-button" onClick={()=>props.history.push('/search')}> <ion-icon name="search-outline"></ion-icon> </span>
      </Top>
      <Tab>
        <NavLink to="/recommend" activeClassName="selected">
           <TabItem> <span> 推荐 </span> </TabItem> 
        </NavLink>
        <NavLink to="/singers" activeClassName="selected">
           <TabItem> <span> 歌手 </span> </TabItem> 
        </NavLink>
        <NavLink to="/rank" activeClassName="selected">
           <TabItem> <span> 排行榜 </span> </TabItem> 
        </NavLink>
      </Tab>
      {/* renderRoutes只能渲染一层，所以home下的路由需要再Home页再执行一次 */}
     { renderRoutes(props.route.routes) }
     <Player currentMode={currentMode} currentIndex={currentIndex} playList={playList}></Player>
     <PlayList currentMode={currentMode} show={showPlayList} playList={playList} currentSong={playList[currentIndex]}></PlayList>
     </>
    )
  }

  return (
    <>
      <PlayListContext.Provider value={setPlayList}>
        <CurrentIndexContext.Provider value={setCurrentIndex}>
          <HasMiniPlayerContext.Provider value={hasMiniPlayer}>
            <ShowPlayListContext.Provider value={setShowPlayList}>
              <CurrentPlayModeContext.Provider value={currentMode}>
                <SetCurrentPlayModeContext.Provider value={setCurrentPlayMode}>
                  <DeleteSongIndexContext.Provider value={setDeleteSongIndex}>
                    {renderHome()}
                  </DeleteSongIndexContext.Provider>
                </SetCurrentPlayModeContext.Provider>
              </CurrentPlayModeContext.Provider>
            </ShowPlayListContext.Provider>
            </HasMiniPlayerContext.Provider>
        </CurrentIndexContext.Provider>
      </PlayListContext.Provider>
    </>
  )
}

export default React.memo(Home)
