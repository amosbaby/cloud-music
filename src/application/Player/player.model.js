import { createContext, useCallback, useReducer } from 'react';
import { getNextMode, PlayMode } from '../../api/constant';

export const defaultPlayerConfig = {
  // 实际播放列表,有可能随机了或者删减了
  playList: [],
  // 原来的播放列表
  originPlayList: [],
  playIndex: -1,
  speedRatio: 1,
  progress: 0,

  showList: false,
  isFullScreen: false,
  isPlaying: false,
  isShowLyric: false,

  currentLyric: null,
  playingLyricText: '',

  duration: 0,
  currentTime: 0,

  mode: PlayMode.sequence,
};

/**
 * 显示mini播放器
 */
export const showMiniPlayer = (config) => config && config.isPlaying && !config.isFullScreen;

/**
 * 显示完全播放器
 */
export const showFullScreenPlayer = (config) => config && config.isPlaying && config.isFullScreen;

export const PlayerActionType = {
  switchList: 'SWITCHLIST',
  switchMode: 'SWITCHMODE',
  changeSongIndex: 'CHANGESONGINDEX',
  changeSongDirection: 'CHANGESONGDIRECTION',
  switchFullScreen: 'SWITCHFULLSCREEN',
  showHideList: 'SHOWHIDELIST',
  deleteSong: 'DELETESONG',
  addSong: 'ADDSONG',
  changeSpeed: 'CHANGESPEED',
  showHideLyric: 'SHOWLYRIC',
  updateLyric: 'UPDATELYRIC',
  updateLyricText: 'UPDATELYRICTEXT',
  switchPlaying: 'SWITCHPLAYING',
  updateProgress: 'UPDATEPROGRESS',
  updateCurrentTime: 'UPDATECURRENTTIME',
};

export const playerReducer = (state, action) => {
  switch (action.type) {
    case PlayerActionType.switchList:
    { // 更新播放列表后，将播放下标重置为0
      const { playList, playIndex = 0 } = action.data;
      return { ...state, playList, playIndex }; }
    case PlayerActionType.switchMode:
    {
      const mode = getNextMode(action.data);
      return { ...state, mode };
    }

    case PlayerActionType.changeSongDirection:
    {
      const dt = action.data === 'Pre' ? -1 : 1;
      const { playIndex, playList, mode } = state;
      const total = playList.length;
      let index = playIndex;
      switch (mode) {
        case PlayMode.loop:
        case PlayMode.random:
          index = playIndex === total - 1 ? 0 : playIndex + dt;
          break;
        case PlayMode.sequence:
          index = Math.min(playIndex + dt, total - 1);
          break;
        default:
          index = total - 1;
          break;
      }

      return { ...state, playIndex: index };
    }

    case PlayerActionType.changeSongIndex:
      return { ...state, playIndex: action.data };

    case PlayerActionType.showHideList:
      return { ...state, showList: action.data };
    case PlayerActionType.switchFullScreen:
    { // 切换全屏与最小化
      const isFullScreen = state.isPlaying && action.data;
      return { ...state, isFullScreen }; }

    case PlayerActionType.deleteSong:
    {
      const playList = state.playList.filter((_, index) => index !== action.data);
      const currentIndex = state.playIndex;
      const playIndex = action.data < currentIndex ? currentIndex - 1 : currentIndex;
      return { ...state, playList, playIndex };
    }
    case PlayerActionType.addSong:
    {
      // 将新歌放在数组最后
      const playList = [...state.playList, action.data];
      // 同时更新播放下标
      const playIndex = playList.length - 1;

      return { ...state, playList, playIndex };
    }
    case PlayerActionType.changeSpeed:
    {
      return { ...state, speedRatio: action.data };
    }
    case PlayerActionType.showHideLyric:
    {
      return { ...state, isShowLyric: action.data };
    }
    case PlayerActionType.switchPlaying:
    {
      const isPlaying = action.data || !state.isPlaying;
      return { ...state, isPlaying };
    }
    case PlayerActionType.updateCurrentTime:
    {
      const progress = action.data / (state.duration || 1);
      return { ...state, progress, currentTime: action.data };
    }
    case PlayerActionType.updateLyric:
    {
      return { ...state, currentLyric: action.data };
    }
    case PlayerActionType.updateLyricText:
    {
      return { ...state, playingLyricText: action.data };
    }
    case PlayerActionType.updateProgress:
    {
      const currentTime = action.data * state.duration;
      return {
        ...state, currentTime, isPlaying: true, progress: action.data,
      };
    }
    default:
      return state;
  }
};

export function getPlayerReducer() {
  return useReducer(useCallback(playerReducer), defaultPlayerConfig);
}

export const PlayerContext = createContext();
