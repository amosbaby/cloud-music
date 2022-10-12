import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forceCheck } from 'react-lazyload';
import { renderRoutes } from 'react-router-config';
import Scroll from '../../components/scroll';
import Slider from '../../components/slider';
import RecommendList from './list';
import Content from './style';
import * as actionTypes from './store/actionCreators';
import Loading from '../../components/loading';
import { PlayerContext, showMiniPlayer } from '../Player/player.model';

function Recommend(props) {
  const { config } = useContext(PlayerContext);
  const bannerList = useSelector((state) => state.recommend.getIn(['bannerList']));
  const recommendList = useSelector((state) => state.recommend.getIn(['recommendList']));

  const dispatch = useDispatch();
  useEffect(() => {
    // 如果页面有数据则不发起请求。使用的是immutable数据结构中的size属性
    if (!bannerList.size) {
      dispatch(actionTypes.getBannerList());
    }
    if (!recommendList.size) {
      dispatch(actionTypes.getRecommendList());
    }
  }, []);

  const loadingStatus = useSelector((state) => state.recommend.getIn(['loadingStatus']));

  const bannerListJS = bannerList ? bannerList.toJS() : [];
  const recommendListJS = recommendList ? recommendList.toJS() : [];

  const addBottom = showMiniPlayer(config);

  return (
    <Content addBottom={addBottom}>
      { loadingStatus ? <Loading> </Loading> : (
        <Scroll className="list" onScroll={forceCheck}>
          <div>
            <Slider bannerList={bannerListJS} />
            <RecommendList recommendList={recommendListJS} />
          </div>
        </Scroll>
      ) }

      { renderRoutes(props.route.routes) }
    </Content>
  );
}

export default React.memo(Recommend);
