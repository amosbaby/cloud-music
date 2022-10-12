import React, { forwardRef, useContext } from 'react';
import * as PropsTypes from 'prop-types';
import { formatPlayCount, getName } from '../../api/utils';
import { SongList as ListStyle, SongItem } from './style';
import { PlayerActionType, PlayerContext } from '../Player/player.model';

const SongList = forwardRef((props) => {
  const {
    songs, collectCount, showCollect, musicAnimation,
  } = props;

  const renderCollect = () => (
    <div className="add_list">
      <ion-icon name="star" />
      <span>
        收藏(
        {formatPlayCount(collectCount)}
        )
      </span>
    </div>
  );
  const { dispatcher } = useContext(PlayerContext);

  const selectItem = (event, index) => {
    event.stopPropagation();

    musicAnimation(event.nativeEvent.clientX, event.nativeEvent.clientY);
    dispatcher({ type: PlayerActionType.switchList, data: { playList: songs, playIndex: index } });
  };

  const renderSongItem = () => (
    <>
      {
          songs.map((item, index) => (
            <li key={item.name + index} onClick={(e) => selectItem(e, index)}>
              <span className="index">

                {index + 1}

              </span>
              <div className="info">
                <span>

                  {item.name}

                </span>
                <span>
                  { getName(item.ar)}

                  -
                  {item.al.name}
                </span>
              </div>
            </li>
          ))
        }
    </>
  );

  return (
    <ListStyle>
      <div className="first_line">
        <div className="play_all">
          <ion-icon name="play-circle-outline" />
          <span>

            播放全部
            <span className="sum">
              (共
              {songs.length}
              首)
            </span>
          </span>
        </div>
        { showCollect ? renderCollect() : null }
      </div>
      <SongItem>
        { renderSongItem() }
      </SongItem>
    </ListStyle>
  );
});

SongList.defaultProps = {
  songs: [],
  collectCount: 0,
  showCollect: true,
};

SongList.propTypes = {
  songs: PropsTypes.arrayOf(PropsTypes.any),
  collectCount: PropsTypes.number,
  showCollect: PropsTypes.bool,
  musicAnimation: PropsTypes.func.isRequired,
};

export default React.memo(SongList);
