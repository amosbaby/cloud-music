import animations from 'create-keyframe-animation';
import prefixStyle from '../../../api/utils/css';

const transform = prefixStyle('transform');

// 计算偏移的辅助函数
const _getPosAndScale = () => {
  const targetWidth = 40;
  const paddingLeft = 40;
  const paddingBottom = 30;
  const paddingTop = 80;
  const width = window.innerWidth * 0.8;
  const scale = targetWidth / width;
  // 两个圆心的横坐标距离和纵坐标距离
  const x = -(window.innerWidth / 2 - paddingLeft);
  const y = window.innerHeight - paddingTop - width / 2 - paddingBottom;
  return {
    x,
    y,
    scale,
  };
};

export function createLeave(cdWrapperRef) {
  return () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = 'all 0.4s';
    const { x, y, scale } = _getPosAndScale();
    cdWrapperDom.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`;
  };
}

export function createAfterEnter(cdWrapperRef) {
  return () => {
    // 进入后解绑帧动画
    const cdWrapperDom = cdWrapperRef.current;
    animations.unregisterAnimation('move');
    cdWrapperDom.style.animation = '';
  };
}

export function createAfterLeave(playerRef, cdWrapperRef, currentModeRef) {
  return () => {
    if (!cdWrapperRef.current) return;
    const cdWrapperDom = cdWrapperRef.current;
    cdWrapperDom.style.transition = '';
    cdWrapperDom.style[transform] = '';
    // 一定要注意现在要把 normalPlayer 这个 DOM 给隐藏掉，因为 CSSTransition 的工作只是把动画执行一遍。不置为 none 现在全屏播放器页面还是存在
    playerRef.current.style.display = 'none';
    currentModeRef.current = 'cd';
  };
}

export function createEnter(playerRef, cdWrapperRef) {
  return () => {
    playerRef.current.style.display = 'block';
    const { x, y, scale } = _getPosAndScale();// 获取 miniPlayer 图片中心相对 normalPlayer 唱片中心的偏移
    const animation = {
      0: {
        transform: `translate3d(${x}px,${y}px,0) scale(${scale})`,
      },
      60: {
        transform: 'translate3d(0, 0, 0) scale(1.1)',
      },
      100: {
        transform: 'translate3d(0, 0, 0) scale(1)',
      },
    };
    animations.registerAnimation({
      name: 'move',
      animation,
      presets: {
        duration: 400,
        easing: 'linear',
      },
    });
    animations.runAnimation(cdWrapperRef.current, 'move');
  };
}
