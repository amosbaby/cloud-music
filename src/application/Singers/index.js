import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LazyLoad, { forceCheck } from 'react-lazyload';
import { renderRoutes } from 'react-router-config';
import { alphaTypes, categoryTypes } from '../../api/horizon-data';
import Horizon from '../../baseUI/Horizon';
import {
  EnterLoading, ListContainer, NavContainer, List, ListItem,
} from './style';
import Scroll from '../../components/scroll';
import {
  getHotSingerList, getMoreSingerList, getSingerList, updatePullDownLoading, updatePullUpLoading,
} from './store/actionCreators';
import Loading from '../../components/loading';
import { CategoryDataContext, UPDATE_ALPHA, UPDATE_CATEGORY } from '../../shared-status';

function Singers(props) {
  const { data, dispatch: sharedDataDispatch } = useContext(CategoryDataContext);
  const { category, alpha } = data.toJS();

  const dispatch = useDispatch();

  const singerList = useSelector((state) => state.singers.getIn(['singerList']));

  useEffect(() => {
    if (!singerList.size) {
      dispatch(getHotSingerList());
    }
  }, [singerList, dispatch]);

  const handleCategoryClick = (index) => {
    const categoryData = categoryTypes[index];
    sharedDataDispatch({ type: UPDATE_CATEGORY, data: categoryData });
    dispatch(getSingerList(data.type, category.area, alpha));
  };

  const handleAlphaClick = (index) => {
    const value = alphaTypes[index].key;
    sharedDataDispatch({ type: UPDATE_ALPHA, data: value });
    dispatch(getSingerList(category.type, category.area, value));
  };

  const handleEnterDetail = (id) => {
    props.history.push(`/singers/${id}`);
  };

  const singersListJS = singerList ? singerList.toJS() : [];

  const renderSingerList = () => (
    <List>
      {
          singersListJS.map((item, index) => (
            <ListItem key={`${item.id}${index}`} onClick={() => handleEnterDetail(item.id)}>
              <div className="img_wrapper">
                <LazyLoad placeholder={<img width="100%" height="100%" src="./singer.png" alt="music" />}>
                  <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                </LazyLoad>
                <span className="name">

                  {item.name}

                </span>
              </div>
            </ListItem>
          ))
        }
    </List>
  );

  const pullDownLoading = useSelector((state) => state.singers.getIn(['pullDownLoading']));
  const pullUpLoading = useSelector((state) => state.singers.getIn(['pullUpLoading']));
  const enterLoading = useSelector((state) => state.singers.getIn(['enterLoading']));

  const handlePullUp = () => {
    dispatch(updatePullUpLoading(true));
    dispatch(getMoreSingerList(category.type, category.area, alpha));
  };
  const handlePullDown = () => {
    dispatch(updatePullDownLoading(true));
    dispatch(getSingerList(category.type, category.area, alpha));
  };

  return (
    <div>
      <NavContainer>
        <Horizon list={categoryTypes} title="分类(默认热门): " handleClick={handleCategoryClick} preValue={category.key} />
        <Horizon list={alphaTypes} title="首字母: " handleClick={handleAlphaClick} preValue={alpha} />
      </NavContainer>
      <ListContainer>
        <Scroll pullUp={handlePullUp} pullDown={handlePullDown} pullDownLoading={pullDownLoading} pullUpLoading={pullUpLoading} onScroll={forceCheck}>
          { renderSingerList() }
        </Scroll>
      </ListContainer>
      {/* 入场动画加载 */}
      { enterLoading ? <EnterLoading><Loading /></EnterLoading> : null }
      {
       renderRoutes(props.route.routes)
     }
    </div>
  );
}

export default React.memo(Singers);
