import React, { lazy, Suspense } from 'react';
// import { Redirect } from 'react-router-dom';
import Home from '../application/Home';

const RecommendComponent = lazy(() => import('../application/Recommend'));
const SingersComponent = lazy(() => import('../application/Singers'));
const RankComponent = lazy(() => import('../application/Rank'));
const AlbumComponent = lazy(() => import('../application/Album'));
const SingerComponent = lazy(() => import('../application/Singer'));
const SearchComponent = lazy(() => import('../application/Search'));

const SuspenseComponent = (Component) => function setup(props) {
  return (
    <Suspense fallback={null}>

      <Component
      // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    </Suspense>
  );
};

const routes = [{
  path: '/',
  component: Home,
  routes: [
    {
      path: '/',
      exact: true,
      component: SuspenseComponent(RecommendComponent),
    },
    {
      path: '/search',
      component: SuspenseComponent(SearchComponent),
    },
    {
      path: '/album/:id',
      exact: true,
      key: 'album',
      component: SuspenseComponent(AlbumComponent),
    },
    {
      path: '/singer/:id',
      exact: true,
      key: 'singer',
      component: SuspenseComponent(SingerComponent),
    },
    {
      path: '/recommend',
      component: SuspenseComponent(RecommendComponent),
      routes: [
        {
          path: '/recommend/:id',
          component: SuspenseComponent(AlbumComponent),
        },
      ],
    },
    {
      path: '/rank',
      component: SuspenseComponent(RankComponent),
      routes: [
        {
          path: '/rank/:id',
          component: SuspenseComponent(AlbumComponent),
        },
      ],
    },
    {
      path: '/singers',
      component: SuspenseComponent(SingersComponent),
      routes: [
        {
          path: '/singers/:id',
          component: SuspenseComponent(SingerComponent),
        },
      ],
    },
  ],
}];

export default routes;
