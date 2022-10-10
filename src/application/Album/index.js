import React, {
  useCallback, useContext, useEffect, useMemo, useRef,
  useState,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { Content, Menu, TopDesc } from './style';
import Header from '../../baseUI/Header';
import Scroll from '../../components/scroll';
import { formatPlayCount } from '../../api/utils';
import GlobalStyle from '../../assets/global-style';
import { getAlbumDetail, updateLoadingStatus } from './store/actionCreators';
import Loading from '../../components/loading';
import SongList from '../SongList';
import { HEADER_HEIGHT } from '../../api/constant';
import MusicNode from '../../baseUI/MusicNode';
import { PlayerConfigContext, showMiniPlayer } from '../Player/player.model';

export function Album(props) {
  const playerConfig = useContext(PlayerConfigContext);

  const [showStatus, setShowStatus] = useState(true);
  const [title, setTitle] = useState('歌单');
  const [isMarquee, setIsMarquee] = useState(false); // 是否显示跑马灯
  const headerRef = useRef();
  const loading = useSelector((state) => state.album.getIn(['loading']));
  const currentAlbumState = useSelector((state) => state.album.getIn(['albumDetail']));
  const currentAlbum = useMemo(() => (currentAlbumState ? currentAlbumState.toJS() : {}), [currentAlbumState]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!currentAlbumState.size || currentAlbum.id !== Number(props.match.params.id)) {
      dispatch(updateLoadingStatus(true));
      dispatch(getAlbumDetail(props.match.params.id));
    }
  }, []);

  const nodeRef = useRef(); // CSSTransition用于引用子组件
  const handleBackClick = useCallback(() => {
    setShowStatus(false);
  }, []);

  const handleScroll = useCallback((position) => {
    const minScrollY = -HEADER_HEIGHT;
    const percent = Math.abs(position.y / minScrollY);
    const headerDom = headerRef.current;
    // 滑过顶部的高度开始变化
    if (position.y < minScrollY) {
      headerDom.style.backgroundColor = GlobalStyle['theme-color'];
      headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
      setTitle(currentAlbum.name);
      setIsMarquee(true);
    } else {
      headerDom.style.backgroundColor = '';
      headerDom.style.opacity = 1;
      setTitle('歌单');
      setIsMarquee(false);
    }
  }, [currentAlbum]);

  const renderTopDesc = () => (
    <TopDesc background={currentAlbum.coverImgUrl}>
      <div className="background">
        <div className="filter" />
      </div>
      <div className="img_wrapper">
        <div className="decorate" />
        <img src={currentAlbum.coverImgUrl} alt="album" />
        <div className="play_count">
          <ion-icon name="play-circle-outline" className="play" />
          <span className="count">

            {formatPlayCount(currentAlbum.subscribedCount)}

          </span>
        </div>
      </div>
      <div className="desc_wrapper">
        <div className="title">

          {currentAlbum.name}

        </div>
        <div className="person">
          <div className="avatar">
            <img src={currentAlbum.creator.avatarUrl} alt="avatar" />
          </div>
          <div className="name">

            {currentAlbum.creator.nickname}

          </div>
        </div>
      </div>
    </TopDesc>
  );

  const musicNodeRef = useRef();
  const musicAnimation = (x, y) => {
    musicNodeRef.current.startAnimation({ x, y });
  };

  const addBottom = showMiniPlayer(playerConfig);

  return (
    <CSSTransition
      in={showStatus}
      timeout={300}
      classNames="fly"
      appear
      unmountOnExit
      onExited={props.history.goBack}
      nodeRef={nodeRef}
    >

      <Content ref={nodeRef} addBottom={addBottom}>
        <Header ref={headerRef} title={title} isMarquee={isMarquee} handleClick={handleBackClick} />
        { loading ? <Loading /> : (
          <Scroll bounceTop={false} onScroll={handleScroll}>
            <div>
              {renderTopDesc()}
              <Menu>
                <div>
                  <ion-icon name="chatbox-ellipses-outline" />

                  评论
                </div>
                <div>
                  <ion-icon name="thumbs-up-outline" />

                  点赞
                </div>
                <div>
                  <ion-icon name="star-outline" />

                  收藏
                </div>
                <div>
                  <ion-icon name="ellipsis-horizontal-outline" />

                  更多
                </div>
              </Menu>
              <SongList musicAnimation={musicAnimation} songs={currentAlbum.tracks} collectCount={currentAlbum.subscribedCount} />
            </div>
          </Scroll>
        )}
        <MusicNode ref={musicNodeRef} />
      </Content>

    </CSSTransition>
  );
}

export default React.memo(Album);
