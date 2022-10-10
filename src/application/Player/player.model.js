import { createContext } from 'react';
import { PlayMode } from '../../api/constant';
import { getSongDetailRequest } from '../../api/request';

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
  changeSong: 'CHANGESONG',
  switchFullScreen: 'SWITCHFULLSCREEN',
  showHideList: 'SHOWHIDELIST',
  deleteSong: 'DELETESONG',
  addSong: 'ADDSONG',
  changeSpeed: 'CHANGESPEED',
  showHideLyric: 'SHOWLYRIC',
  switchPlaying: 'SWITCHPLAYING',
  updateProgress: 'UPDATEPROGRESS',
};

export const playerReducer = async (state, action) => {
  switch (action.type) {
    case PlayerActionType.switchList:
    { // 更新播放列表后，将播放下标重置为0
      const { playList, playIndex = 0 } = action.data;
      return { ...state, playList, playIndex }; }
    case PlayerActionType.switchMode:
      return { ...state, mode: action.data };
    case PlayerActionType.changeSong:
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
      const res = await getSongDetailRequest(action.data);
      // 将新歌放在数组最后
      const playList = [...state.playList, res.songs[0]];
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
      return { ...state, isPlaying: action.data };
    }
    case PlayerActionType.updateProgress:
    {
      return { ...state, progress: action.data };
    }
    default:
      return state;
  }
};

export const PlayerConfigContext = createContext();
export const PlayerConfigDispatchContext = createContext();
