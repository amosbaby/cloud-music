import React from "react";
import { renderRoutes } from "react-router-config";

function Home(props){
  return (
    <React.Fragment>
      <div> Welcome to Home page! </div>
      {/* renderRoutes只能渲染一层，所以home下的路由需要再Home页再执行一次 */}
     { renderRoutes(props.route.routes) }
    </React.Fragment>
  )
}

export default React.memo(Home)
