import React, { useMemo } from 'react';
import { renderRoutes } from 'react-router-config';
import { NavLink } from 'react-router-dom';
import PlayList from '../../components/play-list';
import Player from '../Player';
import { Tab, TabItem, Top } from './style';
import {
  getPlayerReducer, PlayerContext,
} from '../Player/player.model';

function Home(props) {
  const { history, route } = props;

  const [config, dispatcher] = getPlayerReducer();

  const onShowSearch = () => {
    history.push('/search');
  };

  const renderHome = () => (
    <>
      <Top>
        <span>
          <ion-icon name="grid-outline" />
        </span>
        <span> 网易云音乐 </span>
        <span className="search-button" onClick={() => onShowSearch()}>
          <ion-icon name="search-outline" />
        </span>
      </Top>
      <Tab>
        <NavLink to="/" exact activeClassName="selected">
          <TabItem>

            <span> 推荐 </span>

          </TabItem>
        </NavLink>
        <NavLink to="/singers" activeClassName="selected">
          <TabItem>

            <span> 歌手 </span>

          </TabItem>
        </NavLink>
        <NavLink to="/rank" activeClassName="selected">
          <TabItem>

            <span> 排行榜 </span>

          </TabItem>
        </NavLink>
      </Tab>
      {/* renderRoutes只能渲染一层，所以home下的路由需要再Home页再执行一次 */}
      { renderRoutes(route.routes) }
      <Player />
      <PlayList />
    </>
  );
  const playerContext = useMemo(() => ({ config, dispatcher }), [config]);
  return (
    <PlayerContext.Provider value={playerContext}>
      {renderHome()}
    </PlayerContext.Provider>
  );
}

export default React.memo(Home);
