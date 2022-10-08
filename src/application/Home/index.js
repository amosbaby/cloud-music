import React, { useReducer } from 'react';
import { renderRoutes } from 'react-router-config';
import { NavLink } from 'react-router-dom';
import PlayList from '../../components/play-list';
import Player from '../Player';
import { Tab, TabItem, Top } from './style';
import {
  defaultPlayerConfig, PlayerConfigContext, PlayerConfigDispatchContext, playerReducer,
} from '../Player/player.model';

function Home(props) {
  const { history, route } = props;
  const [playerConfig, playerDispatch] = useReducer(playerReducer, defaultPlayerConfig);

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
        <NavLink to="/recommend" activeClassName="selected">
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

  return (
    <PlayerConfigContext.Provider value={playerConfig}>
      <PlayerConfigDispatchContext.Provider value={playerDispatch}>
        {renderHome()}
      </PlayerConfigDispatchContext.Provider>
    </PlayerConfigContext.Provider>
  );
}

export default React.memo(Home);
