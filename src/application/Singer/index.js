import React, {
  useCallback, useContext, useEffect, useRef, useState,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../baseUI/Header';
import {
  BgLayer, CollectButton, Container, ImgWrapper, SongListWrapper,
} from './style';
import SongList from '../SongList';
import Scroll from '../../components/scroll';
import { HEADER_HEIGHT } from '../../api/constant';
import { getArtist, updateLoading } from './store/actionCreators';
import Loading from '../../components/loading';
import MusicNode from '../../baseUI/MusicNode';
import { PlayerConfigContext, showMiniPlayer } from '../Player/player.model';

function Singer(props) {
  const playerConfig = useContext(PlayerConfigContext)
  const [showStatus, setShowStatus] = useState(true);
  const nodeRef = useRef();

  const handleBackClick = useCallback(() => {
    setShowStatus(false);
  }, []);

  const artistState = useSelector((state) => state.artist.getIn(['artist']));
  const artist = artistState ? artistState.toJS() : null;

  const hotSongsState = useSelector((state) => state.artist.getIn(['hotSongs']));
  const hotSongs = hotSongsState ? hotSongsState.toJS() : null;
  const dispatch = useDispatch();
  useEffect(() => {
    const currentId = props.match.params.id;
    if (!hotSongs.size || Number(currentId) !== artist.id) {
      dispatch(updateLoading(true));
      dispatch(getArtist(currentId));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const loading = useSelector((state) => state.artist.getIn(['loading']));

  const collectButtonRef = useRef();
  const imageWrapperRef = useRef();
  const songScrollWrapperRef = useRef();
  const songScrollRef = useRef();
  const headerRef = useRef();
  const layerRef = useRef();
  // 图片初始高度
  const initialHeight = useRef(0);
  // 往上偏移的尺寸，露出圆角
  const OFFSET = 5;

  useEffect(() => {
    const height = imageWrapperRef.current.offsetHeight;
    songScrollWrapperRef.current.style.top = `${height - OFFSET}px`;
    initialHeight.current = height;
    // 把遮罩先放在下面，以裹住歌曲列表
    layerRef.current.style.top = `${height - OFFSET}px`;
    songScrollRef.current.refresh();
  }, []);

  const handleScroll = useCallback((pos) => {
    const currentY = pos.y;
    const height = initialHeight.current;
    const minScrollY = -(height - OFFSET) + HEADER_HEIGHT;

    // 滑动距离占图片高度的比率
    const percent = Math.abs(currentY / height);

    if (currentY > 0) {
      // 下拉时放大图片，按钮随着移动
      imageWrapperRef.current.style.transform = `scale(${1 + percent})`;
      collectButtonRef.current.style.transform = `translate3d(0,${currentY}px,0)`;
      layerRef.current.style.top = `${height - OFFSET + currentY}px`;
    } else if (currentY >= minScrollY) {
      // 上移时缩小图片，按钮随着移动
      imageWrapperRef.current.style.transform = `scale(${1 - percent})`;
      imageWrapperRef.current.style.zIndex = -1;
      imageWrapperRef.current.style.paddingTop = '75%';
      imageWrapperRef.current.style.height = 0;
      collectButtonRef.current.style.transform = `translate3d(0,${currentY}px,0)`;
      collectButtonRef.current.style.opacity = `${1 - percent * 2}`;
      layerRef.current.style.top = `${height - OFFSET - Math.abs(currentY)}px`;
      layerRef.current.style.zIndex = 1;
    } else if (currentY < minScrollY) {
      layerRef.current.style.top = `${HEADER_HEIGHT - OFFSET}px`;
      layerRef.current.style.zIndex = 1;
      // 防止溢出的歌单内容遮住header
      headerRef.current.style.zIndex = 100;
      // 此时图片高度与header一致
      // imageWrapperRef.current.style.height = `${HEADER_HEIGHT}px`
      // imageWrapperRef.current.style.paddingTop = 0
      // imageWrapperRef.current.style.zIndex = 99
    }
  }, []);

  const musicNodeRef = useRef();
  const musicAnimation = (x, y) => {
    musicNodeRef.current.startAnimation({ x, y });
  };

  const addBottom = showMiniPlayer(playerConfig)

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
      <Container ref={nodeRef} addBottom={addBottom}>
        <Header ref={headerRef} title={artist.name} handleClick={() => handleBackClick()} />
        <ImgWrapper ref={imageWrapperRef} bgUrl={artist.picUrl}>
          <div className="filter" />
        </ImgWrapper>
        <CollectButton ref={collectButtonRef}>
          <ion-icon name="star" />
          <span className="text"> 收藏 </span>
        </CollectButton>
        <BgLayer ref={layerRef} />
        <SongListWrapper ref={songScrollWrapperRef}>
          <Scroll ref={songScrollRef} onScroll={handleScroll}>
            <SongList songs={hotSongs} collectCount={artist.subscribedCount} showCollect={false} musicAnimation={musicAnimation} />
          </Scroll>
        </SongListWrapper>
        { loading ? <Loading /> : null }
        <MusicNode ref={musicNodeRef} />
      </Container>
    </CSSTransition>
  );
}

export default React.memo(Singer);
