/** header高度 */
export const HEADER_HEIGHT = 45;
/** 播放模式 */
export const PlayMode = {
  /** 顺序播放 */
  sequence: { index: 0, desc: '顺序播放', icon: 'repeat-outline' },
  /** 随机播放 */
  random: { index: 1, desc: '随机播放', icon: 'shuffle-outline' },
  /** 循环播放 */
  loop: { index: 2, desc: '循环播放', icon: 'reload-outline' },
};

export const getNextMode = (currentMode) => {
  const index = currentMode ? (currentMode.index + 1) % 3 : 0;
  return Object.values(PlayMode).find((mode) => mode.index === index);
};

/**
 * 播放速度
 */
export const PlaySpeedList = [0.75, 1, 1.25, 2];
