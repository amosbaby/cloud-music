import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import LazyLoad, { forceCheck } from "react-lazyload";
import { connect, useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { getName } from "../../api/utils";
import Loading from "../../components/loading";
import Scroll from "../../components/scroll";
import { AddSongContext } from "../Home";
import SearchBox from "./SearchBox";
import { updateSongList, updateSuggestList } from "./store/actionCreators";
import { mapDispatchToProps, mapStateToProps } from "./store/utils";
import { SongItem,Container, HotKey, List, ListItem, ShortcutWrapper } from "./style";

function Search(props){

  const {loading, hotList:immutableHotList,
    suggestList:immutableSuggestList,
    songList:immutableSongList
   } = props

  const hotList = immutableHotList
  const suggestList = immutableSuggestList.toJS()
  const songList = immutableSongList.toJS()

  const [show,setShow] = useState(false)
  const containerRef = useRef()


  const {getHotListDispatch,updateLoadingDispatch,getSuggestListDispatch} = props

  useEffect(()=>{
    setShow(true)
    if(!hotList.size){
      getHotListDispatch()
    }
  },[])

  const [query,setQuery] = useState('')

  const handleBack = useCallback(()=>{
    setShow(false)
  },[])

  const dispatch = useDispatch()
  const handleQuery = useCallback((query)=>{
    setQuery(query)
    if(!query) {
      dispatch(updateSuggestList([]))
      dispatch(updateSongList([]))
      return
    }
    updateLoadingDispatch(true)
    getSuggestListDispatch(query)
  },[])

  const setAddSongId = useContext(AddSongContext)

  const renderHotKeys = ()=>{
    const list = hotList.toJS() || []
    return (
      <ul>
        {
          list.map(item=>{
            return (
              <li className="item" key={item.first} onClick={()=>setQuery(item.first)}> { item.first} </li>
            )
          })
        }
      </ul>
    )
  }

  const onEnterAlbum = (id) => {
    props.history.push(`/album/${id}`)
  }

  const renderAlbum = ()=>{
    const albums = suggestList.playlists
    if(!albums?.length) return 

    return (
      <List>
        <h1 className="title"> 相关歌单 </h1>
        {
          albums.map((item,index) => {
           return (
            <ListItem key={item.accountId+""+index} onClick={()=>onEnterAlbum(item.id)}>
            <div className="img_wrapper">
              <LazyLoad placeholder={<img width="100%" height="100%" src={require('./music.png')} alt="p"/>}>
                <img src={item.coverImgUrl} width="100%" height="100%" alt="music"/>
              </LazyLoad>
            </div>
            <span className="name"> 歌单：{item.name} </span>
          </ListItem>
           )
          })
        }
      </List>
    )
  }

  const onEnterSinger = (id) => {
    props.history.push(`/singer/${id}`)
  }

  const renderSingers = ()=>{
    const singers = suggestList.artists
    if(!singers?.length) return 

    return (
      <List>
        <h1 className="title"> 相关歌手 </h1>
        {
          singers.map((item,index)=>{
            return (
              <ListItem key={item.accountId+""+index} onClick={()=>onEnterSinger(item.id)}>
              <div className="img_wrapper">
              <LazyLoad placeholder={<img width="100%" height="100%" src={require('./music.png')} alt="p"/>}>
                <img src={item.picUrl} width="100%" height="100%" alt="music"/>
                </LazyLoad>
              </div>
              <span className="name"> 歌手：{item.name} </span>
            </ListItem>
            )
          })
        }
      </List>
    )
  }

  const renderSongs = ()=>{
    if(!songList.length) return
    return (
      <List>
       <h1 className="title"> 相关歌曲 </h1>
      <SongItem style={{paddingLeft:"20px"}}>
        {
          songList.map((item,index)=>{
            return (
              <li key={item.id} onClick={()=>setAddSongId(item.id)}>
                <div className="info">
                  <span> {item.name} </span>
                  <span> 
                    { getName(item.artists)} - {item.album.name}
                  </span>
                </div>
              </li>
            )
          })
        }
      </SongItem>
     </List>
    )
  }

  return (
    <CSSTransition 
      in={show} 
      timeout={300}
      appear={true} 
      classNames="fly" 
      unmountOnExit 
      onExit={()=>props.history.goBack()}
      nodeRef={containerRef}
      >
        <Container ref={containerRef}>
          <div className="search_box_wrapper">
          <SearchBox back={handleBack} hotQuery={query} handleQuery={handleQuery} ></SearchBox>
          </div>

          <ShortcutWrapper>
            <Scroll onScroll={forceCheck}>
              <div>
                <HotKey>
                  <h1 className="title"> 热门搜索 </h1>
                  {renderHotKeys()}
                </HotKey>
                 
                 <div show={query}>
                   {renderAlbum()}
                   {renderSingers()}
                   {renderSongs()}
                 </div>
              </div>
            </Scroll>
          </ShortcutWrapper>

          { loading ? <Loading></Loading> : null }
        </Container>

    </CSSTransition>
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Search))  
