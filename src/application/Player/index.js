import React, {
  useContext,
  useEffect, useRef, useState,
} from 'react';
import { PlayMode } from '../../api/constant';
import { getLyricRequest } from '../../api/request';
import { getRandomInt, getSongUrl } from '../../api/utils';
import Toast from '../../baseUI/Toast';
import Lyric from './Lyric/model';
import MiniPlayer from './miniPlayer';
import NormalPlayer from './normalPlayer';
import { PlayerConfigContext, PlayerConfigDispatchContext } from './player.model';

function Player() {
  // const currentLyric = useRef();
  // const currentLineIndex = useRef(0);

  const playerConfig = useContext(PlayerConfigContext);
  const playerDispatcher = useContext(PlayerConfigDispatchContext);

  const audioRef = useRef();
  const [modeText, setModeText] = useState('');
  const toastRef = useRef();

  const handleLyric = ({ lineIndex, text }) => {
    if (!currentLyric.current) return;
    currentLineIndex.current = lineIndex;
    setPlayingLyric(text);
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

  const updateTime = (event) => {
    setCurrentTime(event.target.currentTime);
    setPercent(event.target.currentTime / duration);
  };

  const onProgressChange = (percent) => {
    const time = duration * percent;
    setCurrentTime(time);
    console.log('onProgressChange:', time);
    setPercent(percent);
    audioRef.current.currentTime = time;
    if (!playing) {
      setPlaying(true);
    }
    if (currentLyric.current) {
      currentLyric.current.seek(time * 1000);
    }
  };

  const onAudioError = () => {
    setModeText('无权播放!');
    setTimeout(() => {
      handleNext();
    }, 1000);
  };

  const handleLoop = () => {
    setCurrentTime(0);
    setPercent(0);
    audioRef.current.play();
  };

  const handlePre = () => {
    if (playList.length === 1) {
      handleLoop();
      return;
    }

    let index;

    switch (currentMode) {
      case PlayMode.loop:
        index = currentIndex < 1 ? playList.length - 1 : currentIndex - 1;
        break;
      case PlayMode.random:
        index = getRandomInt(0, playList.length - 1);
        break;
      case PlayMode.sequence:
        index = Math.max(0, currentIndex - 1);
        break;
      default:
        index = 0;
        break;
    }
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (playList.length === 1) {
      handleLoop();
      return;
    }
    const total = playList.length;
    let index;

    switch (currentMode) {
      case PlayMode.loop:
        index = currentIndex === total - 1 ? 0 : currentIndex + 1;
        break;
      case PlayMode.random:
        index = getRandomInt(0, total - 1);
        break;
      case PlayMode.sequence:
        index = Math.min(currentIndex + 1, total - 1);
        break;
      default:
        index = total - 1;
        break;
    }
    setCurrentIndex(index);
  };

  const handlePlayEnded = () => {
    setPlaying(false);
    handleNext();
  };

  const handlePlay = (e) => {
    console.log('handlePlay', e);
  };

  const handleShowList = () => {
    setShowPlayList(true);
  };

  return (
    <>
      {
        currentSong.al ? (
          <>
            <NormalPlayer speed={speed} currentLyric={currentLyric.current} playingLyric={playingLyric} currentLyricIndex={currentLineIndex.current} mode={currentMode} percent={percent} duration={duration} currentTime={currentTime} playing={playing} fullScreen={fullScreen} toggleFullScreen={setFullScreen} song={currentSong} clickPlaying={clickPlaying} onProgressChange={onProgressChange} handlePre={handlePre} handleNext={handleNext} handleShowList={handleShowList} handleChangeSpeed={handleChangeSpeed} />
            <MiniPlayer percent={percent} duration={duration} currentTime={currentTime} playing={playing} fullScreen={fullScreen} toggleFullScreen={setFullScreen} song={currentSong} clickPlaying={clickPlaying} handleShowList={handleShowList}> </MiniPlayer>
          </>
        ) : null
      }

      <audio autoPlay ref={audioRef} onTimeUpdate={updateTime} onEnded={handlePlayEnded} onError={onAudioError} onPlay={handlePlay} />
      <Toast ref={toastRef} text={modeText} />
    </>
  );
}

export default React.memo(Player);
