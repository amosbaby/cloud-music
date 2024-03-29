import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import Loading from '../../components/loading';
import Scroll from '../../components/scroll';
import { PlayerContext, showMiniPlayer } from '../Player/player.model';
import { getRankList } from './store/actionCreators';
import {
  Container, List, ListItem, SongList,
} from './style';

function Rank(props) {
  const { config } = useContext(PlayerContext);
  const rankList = useSelector((state) => state.rank.getIn(['rankList']));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!rankList.size) {
      dispatch(getRankList());
    }
  }, [dispatch, rankList]);

  const loading = useSelector((state) => state.rank.getIn(['loading']));

  const rankListJS = rankList ? rankList.toJS() : [];

  const globalStartIndex = rankListJS.findIndex((item) => item.tracks.length);

  const renderSongList = (list) => (list.length ? (
    <SongList>
      {
          list.map((item, index) => (
            <li key={item.first + index}>
              {index + 1}
              .
              {item.first}
              -
              {item.second}
            </li>
          ))
        }
    </SongList>
  ) : null);

  const handleClick = (id) => {
    props.history.push(`/rank/${id}`);
  };

  const renderRankList = (list, isGlobal) => (
    <List isGlobal={isGlobal}>
      {
            list.map((item) => (
              <ListItem
                key={item.id}
                tracks={item.tracks}
                isGlobal={isGlobal}
                onClick={() => handleClick(item.id)}
              >
                <div className="img_wrapper">
                  <img src={item.coverImgUrl} alt="rank" />
                  <div className="decorate" />
                  <span className="update_frequency">
                    {item.updateFrequency}
                  </span>
                </div>
                { renderSongList(item.tracks) }
              </ListItem>
            ))
          }
    </List>
  );
  const displayStyle = { display: loading ? '' : 'none' };

  const addBottom = showMiniPlayer(config);

  return (
    <Container addBottom={addBottom}>
      <Scroll>
        <div>
          <h1 className="official" style={displayStyle}> 官方榜 </h1>
          {renderRankList(rankListJS.slice(0, globalStartIndex), false) }
          <h1 className="official" style={displayStyle}> 全球榜 </h1>
          {renderRankList(rankListJS.slice(globalStartIndex), true) }
        </div>
      </Scroll>
      {/* 入场动画加载 */}
      {loading ? <Loading /> : null }
      { renderRoutes(props.route.routes) }
    </Container>
  );
}

export default React.memo(Rank);
