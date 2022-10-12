import React, {
  forwardRef, useEffect, useImperativeHandle, useRef,
} from 'react';
import prefixStyle from '../../api/utils/css';
import Container from './style';
// 容器里最多只能装3个音符
const MAX_ICON_NUMBER = 3;

const MusicNode = forwardRef((props, ref) => {
  const iconsRef = useRef();

  const transform = prefixStyle('transform');
  const createNode = (text) => {
    const template = `<div class='icon_wrapper'> ${text} </div>`;
    const tempNode = document.createElement('div');
    tempNode.innerHTML = template;
    return tempNode.firstChild;
  };

  useEffect(() => {
    for (let i = 0; i < MAX_ICON_NUMBER; i++) {
      const node = createNode('<ion-icon  name="musical-notes-outline"></ion-icon>');
      iconsRef.current.appendChild(node);
    }

    const domArray = Array.from(iconsRef.current.children);
    domArray.forEach((item) => {
      item.running = false;
      item.addEventListener('transitionend', () => {
        item.style.display = 'none';
        item.style[transform] = 'translate3d(0,0,0)';
        item.running = false;
        const icon = item.querySelector('ion-icon');
        icon.style[transform] = 'translate3d(0,0,0)';
      }, false);
    });
  });

  const startAnimation = ({ x, y }) => {
    for (let i = 0; i < MAX_ICON_NUMBER; i++) {
      const domArray = [].slice.call(iconsRef.current.children);
      const item = domArray[i];
      // 选择一个空闲的元素来开始动画
      if (item.running === false) {
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        item.style.display = 'inline-block';

        setTimeout(() => {
          item.running = true;
          item.style[transform] = 'translate3d(0, 750px, 0)';
          const icon = item.querySelector('ion-icon');
          icon.style[transform] = 'translate3d(-40px, 0, 0)';
        }, 20);
        break;
      }
    }
  };
  // 外界调用的 ref 方法
  useImperativeHandle(ref, () => ({
    startAnimation,
  }));

  return (
    <Container ref={iconsRef} />
  );
});

export default React.memo(MusicNode);
