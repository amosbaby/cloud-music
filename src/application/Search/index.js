import React, { useCallback, useEffect, useRef, useState } from "react";
import LazyLoad from "react-lazyload";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import Loading from "../../components/loading";
import Scroll from "../../components/scroll";
import SearchBox from "./SearchBox";
import { mapDispatchToProps, mapStateToProps } from "./store/utils";
import { Container, HotKey, List, ListItem, ShortcutWrapper } from "./style";

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

  const handleQuery = useCallback((query)=>{
    if(!query) return
    setQuery(query)
    updateLoadingDispatch(true)
    getSuggestListDispatch(query)
  },[])

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

  const renderAlbum = ()=>{
    const albums = suggestList.playlists
    if(!albums?.length) return 

    return (
      <List>
        <h1 className="title"> 相关歌单 </h1>
        {
          albums.map((item,index) => {
           return (
            <ListItem key={item.accountId+""+index}>
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

          <ShortcutWrapper show={query}>
            <Scroll>
              <div>
                <HotKey>
                  <h1 className="title"> 热门搜索 </h1>
                  {renderHotKeys()}
                  {renderAlbum()}
                </HotKey>
              </div>
            </Scroll>
          </ShortcutWrapper>

          { loading ? <Loading></Loading> : null }
        </Container>

    </CSSTransition>
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Search))  
