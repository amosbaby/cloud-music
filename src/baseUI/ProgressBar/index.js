import React, { useEffect, useRef, useState } from 'react';
import { ProgressBarWrapper } from './style';

function ProgressBar(props) {
  const { updatePercent, percent } = props;
  const progressBarRef = useRef();
  const progressRef = useRef();
  const progressBtnWrapperRef = useRef();

  const [touch, setTouch] = useState({});
  const progressBtnWidth = 16;

  const touchStart = (e) => {
    const startTouch = {};
    startTouch.initiated = true; // true表示开始滑动了
    startTouch.startX = e.touches[0].pageX; // 滑动开始时间横向坐标
    startTouch.left = progressRef.current.clientWidth; // 当前progress长度
    setTouch(startTouch);
  };
  const touchMove = (e) => {
    if (!touch.initiated) return;
    // 滑动距离
    const deltaX = e.touches[0].pageX - touch.startX;
    const barWidth = progressBarRef.current.clientWidth - progressBtnWidth;
    const offsetWidth = Math.min(Math.max(0, touch.left + deltaX), barWidth);
    updateOffset(offsetWidth);
  };
  const touchEnd = () => {
    setTouch({ ...touch, initiated: false });
  };

  const progressClick = (e) => {
    const rect = progressBarRef.current.getBoundingClientRect();
    const offsetWidth = e.pageX - rect.left;
    updateOffset(offsetWidth);
  };

  const updateOffset = (offsetWidth) => {
    progressRef.current.style.width = `${offsetWidth}px`;
    progressBtnWrapperRef.current.style.transform = `translate3d(${offsetWidth}px,0,0)`;
    _changePercent();
  };

  const _changePercent = () => {
    const barWidth = progressBarRef.current.clientWidth - progressBtnWidth;
    const curPercent = progressRef.current.clientWidth / barWidth;// 新的进度计算
    updatePercent && updatePercent(curPercent);// 把新的进度传给回调函数并执行
  };
  useEffect(() => {
    const { clientWidth } = progressBarRef.current;
    const offsetWidth = clientWidth * percent;
    progressRef.current.style.width = `${offsetWidth}px`;
    progressBtnWrapperRef.current.style.transform = `translate3d(${offsetWidth}px,0,0)`;
    // updateOffset(offsetWidth)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent]);

  return (
    <ProgressBarWrapper>
      <div className="bar-inner" ref={progressBarRef} onClick={progressClick}>
        <div className="progress" ref={progressRef} />
        <div className="progress-btn-wrapper" ref={progressBtnWrapperRef} onTouchStart={touchStart} onTouchMove={touchMove} onTouchEnd={touchEnd}>
          <div className="progress-btn" />
        </div>
      </div>
    </ProgressBarWrapper>
  );
}

export default React.memo(ProgressBar);
