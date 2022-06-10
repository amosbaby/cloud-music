import React from "react";
import { Redirect } from "react-router-dom";
import Home from "./Home";
import Rank from "./Rank";
import Recommend from "./Recommend";
import Singers from "./Singers";

 const routes = [{
  path:'/',
  component:Home,
  routes:[
    {
      path:'/',
      exact:true,
      render:()=>{
        <Redirect to={"/recommend"} />
      } 
    },
    {
      path:'/recommend',
      component:Recommend
    },
    {
      path:'/rank',
      component:Rank
    },
    {
      path:'/singers',
      component:Singers
    }
  ]
}]

export default routes
