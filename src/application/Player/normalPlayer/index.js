import React, { useContext, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { formatPlayTime, getName } from '../../../api/utils';
import {
  Bottom, CDWrapper, LyricContainer, LyricWrapper, Middle, NormalPlayerContainer, Operators, ProgressWrapper, SpeedButton, SpeedButtonList, Top,
} from './style';
import ProgressBar from '../../../baseUI/ProgressBar';
import {
  createAfterEnter, createAfterLeave, createEnter, createLeave,
} from './animation';
import Scroll from '../../../components/scroll';
import { PlaySpeedList } from '../../../api/constant';
import { PlayerActionType, PlayerContext } from '../player.model';

function NormalPlayer() {
  const { config, dispatcher } = useContext(PlayerContext);
  const {
    isFullScreen, progress, speedRation, isPlaying, playList, playIndex, currentTime, currentLyric, isPlayingLyric, currentLyricIndex, mode,
  } = config;
  const currentSong = playList[playIndex];
  const duration = currentSong.dt;

  const currentModeRef = useRef('cd');
  const playerRef = useRef();
  const cdWrapperRef = useRef();
  const lyricScrollRef = useRef();
  const lyricCssNodeRef = useRef();
  const cdCssNodeRef = useRef();
  const lyricLineRef = useRef([]);

  // 启用帧动画
  const enter = createEnter(playerRef, cdWrapperRef);
  const afterEnter = createAfterEnter(cdWrapperRef);
  const leave = createLeave(cdWrapperRef);
  const afterLeave = createAfterLeave(playerRef, cdWrapperRef, currentModeRef);

  const handleClickMode = (event) => {
    event.stopPropagation();
    dispatcher({ type: PlayerActionType.switchMode });
  };

  const handleChangeSong = (event, dir) => {
    event.stopPropagation();
    dispatcher({ type: PlayerActionType.changeSongDirection, data: dir });
  };

  const handleChangeSpeed = (event, speed) => {
    event.stopPropagation();
    dispatcher({ type: PlayerActionType.changeSpeed, data: speed });
  };

  const handlePlaying = (event, playing) => {
    event.stopPropagation();
    dispatcher({ type: PlayerActionType.switchPlaying, data: playing });
  };

  const handleShowList = (event) => {
    event.stopPropagation();
    dispatcher({ type: PlayerActionType.showHideList, data: true });
  };

  const handleBack = (event) => {
    event.stopPropagation();
    dispatcher({ type: PlayerActionType.switchFullScreen, data: false });
  };
  const toggleModeChange = (event) => {
    event.stopPropagation();
    currentModeRef.current = currentModeRef.current === 'cd' ? 'lyric' : 'cd';
  };

  useEffect(() => {
    const bScroll = lyricScrollRef.current?.getBScroll();
    if (!bScroll) return;

    if (currentLyricIndex > 5) {
      // 保持当前歌词在第 5 条的位置
      const lineEl = lyricLineRef.current[currentLyricIndex - 5].current;
      bScroll.scrollToElement(lineEl, 1000);
    } else {
      // 当前歌词行数 <=5, 直接滚动到最顶端
      bScroll.scrollTo(0, 0, 1000);
    }
  }, [currentLyricIndex]);

  const renderSpeedButtons = () => (
    <SpeedButtonList>
      <span> 倍速听歌 </span>
      {
          PlaySpeedList.map((item) => (
            <SpeedButton key={item} className={`${speedRation === item ? 'selected' : ''}`} onClick={(e) => { handleChangeSpeed(e, item); }}>

              {`x${item}`}

            </SpeedButton>
          ))
        }
    </SpeedButtonList>
  );

  const renderLyric = () => (
    <CSSTransition in={currentModeRef.current === 'lyric'} timeout={300} classNames="fade" nodeRef={lyricCssNodeRef}>
      <LyricContainer ref={lyricCssNodeRef}>
        <Scroll ref={lyricScrollRef}>
          <LyricWrapper className="lyric_wrapper" style={{ visibility: currentModeRef.current === 'lyric' ? 'visible' : 'hidden' }}>
            {
                  currentLyric ? currentLyric.lines.map((item, index) => {
                    // 拿到每一行的歌词dom
                    lyricLineRef.current[index] = React.createRef();
                    return (
                      <p className={`text ${currentLyricIndex === index ? 'current' : ''}`} key={item + index} ref={lyricLineRef.current[index]}>

                        {item.text}

                      </p>
                    );
                  }) : <p className="text pure"> 纯音乐，请欣赏。</p>
                }
          </LyricWrapper>
        </Scroll>
      </LyricContainer>
    </CSSTransition>
  );

  const renderCD = () => (
    <CSSTransition in={currentModeRef.current === 'cd'} timeout={300} classNames="fade" nodeRef={cdCssNodeRef}>
      <CDWrapper ref={cdCssNodeRef} style={{ visibility: currentModeRef.current === 'cd' ? 'visible' : 'hidden' }}>
        {/* 可旋转needle */}
        <div className={`needle ${isPlaying ? '' : 'pause'}`} />
        <div className="cd">
          <img className={`image ${isPlaying ? 'play' : 'pause'}`} src={`${currentSong.al.picUrl}?param=400x400`} alt="cd" />

        </div>
        <p className="isPlaying_lyric">

          {isPlayingLyric}

        </p>
      </CDWrapper>
    </CSSTransition>
  );

  const renderPlayer = () => (
    <NormalPlayerContainer ref={playerRef}>
      <div className="background">
        <img src={currentSong.al.picUrl} alt="歌曲图片" width="100%" height="100%" />
      </div>
      <div className="background layer" />
      <Top className="top">
        <div className="back" onClick={(e) => handleBack(e)}>
          <ion-icon name="chevron-down-outline" />
        </div>
        <h1 className="title">

          {currentSong.name}

        </h1>
        <h1 className="subtitle">

          {getName(currentSong.ar)}

        </h1>
      </Top>
      <Middle ref={cdWrapperRef} onClick={(e) => toggleModeChange(e)}>
        {renderCD()}
        {renderLyric()}
      </Middle>
      <Bottom className="bottom">
        { renderSpeedButtons() }
        <ProgressWrapper>
          <span className="time time-l">
            { formatPlayTime(currentTime) }

          </span>
          <div className="progress-bar-wrapper">
            <ProgressBar percent={progress} />
          </div>
          <div className="time time-r">
            { formatPlayTime(duration) }

          </div>
        </ProgressWrapper>
        <Operators>
          <div className="icon i-left" onClick={(e) => handleClickMode(e)}>
            <ion-icon name={mode.icon} />
          </div>
          <div className="icon i-left" onClick={(e) => handleChangeSong(e, 'Pre')}>
            <ion-icon name="play-skip-back-outline" />
          </div>
          <div className="icon i-center">
            {
                isPlaying ? <ion-icon name="pause-circle-outline" onClick={(e) => handlePlaying(e, false)} />
                  : <ion-icon name="caret-forward-circle-outline" onClick={(e) => handlePlaying(e, true)} />
              }
          </div>
          <div className="icon i-right" onClick={(e) => handleChangeSong(e, 'Next')}>
            <ion-icon name="play-skip-forward-outline" />
          </div>
          <div className="icon i-right" onClick={(e) => handleShowList(e)}>
            <ion-icon name="list-circle-outline" />
          </div>
        </Operators>
      </Bottom>
    </NormalPlayerContainer>
  );

  return (
    <CSSTransition
      classNames="normal"
      in={isFullScreen}
      timeout={400}
      onEnter={() => enter()}
      onEntered={() => afterEnter()}
      onExited={() => afterLeave()}
      onExit={() => leave()}
      nodeRef={playerRef}
      mountOnEnter
    >
      { renderPlayer() }
    </CSSTransition>
  );
}
export default React.memo(NormalPlayer);
