import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renderRoutes } from "react-router-config";
import { ShouldAddBottom } from "../../api/utils";
import Loading from "../../components/loading";
import Scroll from "../../components/scroll";
import { getRankList } from "./store/actionCreators";
import { Container, List, ListItem, SongList } from "./style";

function Rank(props){

  const rankList = useSelector((state)=>{
    return state.rank.getIn(['rankList'])
  })
  const dispatch = useDispatch()

  useEffect(()=>{
    if(!rankList.size){
      dispatch(getRankList())
    }
  },[dispatch,rankList])

  const loading = useSelector((state)=>{
    return state.rank.getIn(['loading'])
  })

  const rankListJS = rankList ? rankList.toJS() : []

  const globalStartIndex = rankListJS.findIndex(item=>item.tracks.length)
  

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {
          list.map((item,index)=>{
            return <li key={item.first+index}> {index+1}. {item.first} - {item.second} </li>
          })
        }
      </SongList>
      ) : null
  }

  const handleClick = (id)=>{
    props.history.push(`/rank/${id}`)
  }

  const renderRankList = (list, isGlobal) => {
    return (
      <List isGlobal={isGlobal} >
          {
            list.map(item=>{
              return (
                <ListItem key={item.id} tracks={item.tracks} isGlobal={isGlobal}
                  onClick={()=> handleClick(item.id)}
                > 
                  <div className="img_wrapper">
                    <img src={item.coverImgUrl} alt="rank"/>
                    <div className="decorate"></div>
                    <span className="update_frequency"> {item.updateFrequency} </span>
                  </div>
                  { renderSongList(item.tracks) }
                </ListItem>
              )
            })
          }
      </List>
    )
  }
  const displayStyle = {display: loading ? '' : 'none' }

  const addBottom = ShouldAddBottom()

  return (
    <Container addBottom={addBottom}> 
        <Scroll>
            <div >
              <h1 className="official" style={displayStyle} > 官方榜 </h1>
              {renderRankList(rankListJS.slice(0,globalStartIndex),false) }
              <h1 className="official" style={displayStyle} > 全球榜 </h1>
              {renderRankList(rankListJS.slice(globalStartIndex),true) }
            </div>
        </Scroll>
        {/* 入场动画加载 */}
        {loading  ? <Loading></Loading> : null }
        { renderRoutes(props.route.routes) }
    </Container>
  )
}

export default React.memo(Rank)
