import React, {
  useCallback,
  useContext,
  useEffect, useRef, useState,
} from 'react';
import { getLyricRequest } from '../../api/request';
import { getSongUrl } from '../../api/utils';
import Toast from '../../baseUI/Toast';
import Lyric from './Lyric/model';
import MiniPlayer from './miniPlayer';
import NormalPlayer from './normalPlayer';
import { PlayerActionType, PlayerContext } from './player.model';

function Player() {
  const currentLyric = useRef();
  const currentLineIndex = useRef(0);
  const audioRef = useRef();
  const [modeText, setModeText] = useState('');
  const toastRef = useRef();

  const { config, dispatcher } = useContext(PlayerContext);
  const {
    playList, playIndex, isPlaying,
  } = config;
  const currentSong = playList[playIndex];
  const duration = currentSong ? currentSong.dt : 0;

  useEffect(() => {
    if (currentSong?.id) { audioRef.current.src = getSongUrl(currentSong.id); }
  }, [currentSong]);

  const update = () => {
    // eslint-disable-next-line no-unused-expressions
    isPlaying ? audioRef.current.play() : audioRef.current.pause();
  };
  const updatePlaying = useCallback(update);

  useEffect(() => {
    updatePlaying();
  }, [isPlaying]);

  const handleLyric = ({ lineIndex, text }) => {
    if (!currentLyric.current) return;
    currentLineIndex.current = lineIndex;
    dispatcher({ type: PlayerActionType.updateLyricText, data: text });
  };

  const getLyric = (id) => {
    getLyricRequest(id).then((res) => {
      const { lyric } = res.lrc;
      if (!lyric) {
        currentLyric.current = null;
        return;
      }
      currentLyric.current = new Lyric(lyric, handleLyric);
      currentLyric.current.play();
      currentLineIndex.current = 0;
    });
  };

  useEffect(() => {
    toastRef.current.show();
  }, [modeText]);

  // const updateTime = (event) => {
  //   dispatcher({ type: PlayerActionType.updateCurrentTime, data: event.target.currentTime });
  // };

  const onProgressChange = (percent) => {
    const time = duration * percent;

    dispatcher({ type: PlayerActionType.updateProgress, data: percent });
    audioRef.current.currentTime = time;

    if (currentLyric.current) {
      currentLyric.current.seek(time * 1000);
    }
  };

  const onAudioError = () => {
    console.log(getLyric, onProgressChange);
    setModeText('无权播放!');
    setTimeout(() => {
      dispatcher({ type: PlayerActionType.changeSongDirection, data: 'Next' });
    }, 1000);
  };

  // const handleLoop = () => {
  //   dispatcher({ type: PlayerActionType.updateCurrentTime, data: 0 });
  //   audioRef.current.play();
  // };

  const handlePlay = () => {
    // dispatcher({ type: PlayerActionType.switchPlaying });
  };

  const handlePlayEnded = () => {
    dispatcher({ type: PlayerActionType.updateCurrentTime, data: 0 });
  };

  return (
    <>
      {
        currentSong?.al ? (
          <>
            <NormalPlayer />
            <MiniPlayer> </MiniPlayer>
          </>
        ) : null
      }
      {/* onTimeUpdate={updateTime} */}
      <audio autoPlay ref={audioRef} onEnded={handlePlayEnded} onError={onAudioError} onPlay={handlePlay}>
        <track kind="captions" />

      </audio>
      <Toast ref={toastRef} text={modeText} />
    </>
  );
}

export default React.memo(Player);
