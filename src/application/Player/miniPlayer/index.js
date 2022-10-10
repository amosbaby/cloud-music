import React, { useContext, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { getName } from '../../../api/utils';
import ProgressCircle from '../../../baseUI/ProgressCircle';
import { PlayerActionType, PlayerConfigContext, PlayerConfigDispatchContext } from '../player.model';
import { MiniPlayerContainer } from './style';

function MiniPlayer() {
  const {
    progress, isPlaying, playList, playIndex, isFullScreen,
  } = useContext(PlayerConfigContext);
  const currentSong = playList[playIndex];
  const playerDispatcher = useContext(PlayerConfigDispatchContext);

  const playerRef = useRef();
  const switchPlaying = (event, status) => {
    event.stopPropagation();
    playerDispatcher({ type: PlayerActionType.switchPlaying, data: status });
  };
  const showFullScreen = (event) => {
    event.stopPropagation();
    playerDispatcher({ type: PlayerActionType.switchFullScreen, data: true });
  };
  const switchShowList = (event) => {
    event.stopPropagation();
    playerDispatcher({ type: PlayerActionType.showHideList, data: true });
  };
  const renderPlayer = () => (
    <MiniPlayerContainer ref={playerRef}>
      <div className="icon" onClick={(e) => showFullScreen(e)}>
        <div className="imgWrapper">
          <img className={isPlaying ? 'play' : 'pause'} src={currentSong.al.picUrl} alt="img" width="40px" height="40px" />
        </div>
      </div>
      <div className="text">
        <h2 className="name">

          {currentSong.name}

        </h2>
        <p className="desc">

          {getName(currentSong.ar)}

        </p>
      </div>
      <div className="control">
        <ProgressCircle radius={32} percent={progress}>
          {
             isPlaying ? <ion-icon name="pause-outline" onClick={(e) => switchPlaying(e, false)} />
               : <ion-icon name="caret-forward-outline" onClick={(e) => switchPlaying(e, true)} />
           }
        </ProgressCircle>
      </div>
      <div className="control" onClick={(e) => switchShowList(e)}>
        <ion-icon name="musical-notes-outline" />
      </div>
    </MiniPlayerContainer>
  );

  return (
    <CSSTransition
      classNames="mini"
      in={!isFullScreen}
      timeout={400}
      onEnter={() => { playerRef.current.style.display = 'flex'; }}
      onExited={() => { playerRef.current.style.display = 'none'; }}
      nodeRef={playerRef}
      mountOnEnter
    >
      { renderPlayer() }
    </CSSTransition>

  );
}

export default React.memo(MiniPlayer);
