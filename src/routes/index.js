import React from "react";
import { Redirect } from "react-router-dom";
import Album from "../application/Album";
import Home from "../application/Home";
import Rank from "../application/Rank";
import Recommend from "../application/Recommend";
import Search from "../application/Search";
import Singer from "../application/Singer";
import Singers from "../application/Singers";

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
      path:'/search',
      component:Search
    },
    {
      path:'/recommend',
      component:Recommend,
      routes:[
        {
          path:'/recommend/:id',
          component:Album
        },
      ]
    },
    {
      path:'/rank',
      component:Rank,
      routes:[
        {
          path:'/rank/:id',
          component:Album
        },
      ]
    },
    {
      path:'/singers',
      component:Singers,
      routes:[
        {
          path:'/singers/:id',
          component:Singer
        },
      ]
    }
  ]
}]

export default routes
