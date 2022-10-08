import React, {
  useCallback, useContext, useRef, useState,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import { getName } from '../../api/utils';
import { prefixStyle } from '../../api/utils/css';
import { PlayerActionType, PlayerConfigContext, PlayerConfigDispatchContext } from '../../application/Player/player.model';
import Scroll from '../scroll';
import {
  ListContent, ListHeader, PlayListWrapper, ScrollWrapper,
} from './style';

function PlayList() {
  const playerConfig = useContext(PlayerConfigContext);
  const playerDispatcher = useContext(PlayerConfigDispatchContext);

  const [isShow, setIsShow] = useState(false);

  const playListRef = useRef();
  const wrapperRef = useRef();
  const transform = prefixStyle('transform');
  const onEnterCB = useCallback(() => {
    setIsShow(true);
    wrapperRef.current.style[transform] = 'translate3d(0,100%,0)';
  }, [transform]);

  const onEnteringCB = useCallback(() => {
    wrapperRef.current.style.transition = 'all 0.3s';
    wrapperRef.current.style[transform] = 'translate3d(0,0,0)';
  }, [transform]);

  const onExitingCB = useCallback(() => {
    wrapperRef.current.style.transition = 'all 0.3s';
    wrapperRef.current.style[transform] = 'translate3d(0,100%,0)';
  }, [transform]);

  const onExitedCB = useCallback(() => {
    setIsShow(false);
    wrapperRef.current.style[transform] = 'translate3d(0,100%,0)';
  }, [transform]);

  const handleChangeMode = (e) => {
    e.stopPropagation();
  };
  const {
    mode, playIndex, playList, showList,
  } = playerConfig;
  const renderModeInfo = () => (
    <div onClick={(e) => handleChangeMode(e)}>
      <ion-icon name={mode.icon} />
      <span>
        {mode.desc}
      </span>
    </div>
  );

  const currentSong = playList[playIndex];

  const renderCurrentIcon = (item) => {
    const iconName = item.id === currentSong?.id;
    return (
      <span className="current">
        {
         iconName ? <ion-icon name="radio-outline" /> : null
       }
      </span>
    );
  };

  const handleDelete = useCallback((e, index) => {
    e.stopPropagation();
    playerDispatcher({ type: PlayerActionType.deleteSong, data: index });
  });

  const handleChangeSong = useCallback((e, index) => {
    e.stopPropagation();
    playerDispatcher({ type: PlayerActionType.changeSong, data: index });
  });

  const hideList = useCallback((e) => {
    e.stopPropagation();
    playerDispatcher({ type: PlayerActionType.showHideList, data: false });
  });

  const renderList = () => (
    <Scroll>
      <ListContent>
        {
              playList.map((item, index) => (
                <li className="item" key={item.id} onClick={(e) => handleChangeSong(e, index)}>
                  { renderCurrentIcon(item) }
                  <span className="text">
                    {item.name}
                    -
                    {getName(item.ar)}
                  </span>
                  {
                      currentSong.id !== item.id ? (
                        <span className="delete" onClick={(e) => handleDelete(e, index)}>
                          <ion-icon name="trash-outline" />
                        </span>
                      ) : null
                    }

                </li>
              ))
            }
      </ListContent>
    </Scroll>
  );

  return (
    <CSSTransition
      in={showList}
      timeout={300}
      nodeRef={playListRef}
      classNames="list-fade"
      onEnter={onEnterCB}
      onEntering={onEnteringCB}
      onExiting={onExitingCB}
      onExited={onExitedCB}
      unmountOnExit
    >
      <PlayListWrapper
        ref={playListRef}
        style={{ display: isShow ? 'block' : 'none' }}
        onClick={(e) => { hideList(e); }}
      >
        <div className="list_wrapper" ref={wrapperRef}>
          <ListHeader>
            <h1>

              {renderModeInfo()}

            </h1>
          </ListHeader>
          <ScrollWrapper>
            { renderList() }
          </ScrollWrapper>
        </div>

      </PlayListWrapper>
    </CSSTransition>
  );
}

export default React.memo(PlayList);
