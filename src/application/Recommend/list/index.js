import React from 'react';
import LazyLoad from 'react-lazyload';
import { withRouter } from 'react-router-dom';
import { formatPlayCount } from '../../../api/utils';
import { List, ListItem, ListWrapper } from './style';

function RecommendList(props) {
  const { recommendList } = props;

  const enterDetail = (id) => {
    props.history.push(`/recommend/${id}`);
  };

  const list = recommendList.map((item) => (
    <ListItem key={item.id} onClick={() => enterDetail(item.id)}>
      <div className="img_wrapper">
        <div className="decorate" />
        {/* 加参数可减小请求的图片资源大小 */}
        <LazyLoad placeholder={<img width="100%" height="100%" src={require('./music.png')} alt="music" />}>
          <img src={`${item.picUrl}?param=300x300`} alt="music" />
        </LazyLoad>
        <div className="play-count">
          <ion-icon name="play-circle-outline" className="play" />
          <span className="count">
            
            {formatPlayCount(item.playCount)}
            
          </span>
        </div>
      </div>
      <div className="desc">
        
        {item.name}
        
      </div>
    </ListItem>
  ));

  return (
    <ListWrapper>
      <h1 className="title"> 推荐歌单 </h1>
      <List>
        {list}
      </List>
    </ListWrapper>
  );
}

export default React.memo(withRouter(RecommendList));
