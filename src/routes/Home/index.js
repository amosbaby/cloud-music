import React from "react";
import { renderRoutes } from "react-router-config";
import { NavLink } from "react-router-dom";
import { Tab, TabItem, Top } from "./style";

function Home(props){
  return (
    <React.Fragment>
      <Top>
        <span> <ion-icon name="grid-outline"></ion-icon> </span>
        <span> 网易云音乐 </span>
        <span> <ion-icon name="search-outline"></ion-icon> </span>
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
    </React.Fragment>
  )
}

export default React.memo(Home)
