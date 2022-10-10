import React, {
  forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState,
} from 'react';
import * as PropTypes from 'prop-types';
import Bscroll from 'better-scroll';
import { PullDownLoading, PullUpLoading, ScrollContainer } from './style';
import Loading from '../loading';
import LoadingV2 from '../loadingV2';
import { debounce } from '../../api/utils';

const Scroll = forwardRef((props, ref) => {
  const [bScroll, setBScroll] = useState(null);
  const scrollContainerRef = useRef();

  const {
    direction, click, bounceTop, bounceBottom,
  } = props;

  // 初始化better-scroll
  useEffect(() => {
    const scroll = new Bscroll(scrollContainerRef.current, {
      scrollX: direction === 'horizontal',
      scrollY: direction === 'vertical',
      probeType: 3,
      click,
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
    });
    setBScroll(scroll);
    return () => setBScroll(null);
  }, []);
  const {
    onScroll, pullDown, pullUp, refresh,
  } = props;

  const pullUpDebounce = useMemo(() => debounce(pullUp, 300), [pullUp]);
  const pullDownDebounce = useMemo(() => debounce(pullDown, 300), [pullDown]);

  // 监听scroll
  useEffect(() => {
    if (!bScroll || !onScroll) return;
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll);
    });
    return () => {
      bScroll.off('scroll');
    };
  }, [onScroll, bScroll]);

  // 监听上拉加载
  useEffect(() => {
    if (!bScroll || !pullUp) return;
    bScroll.on('scrollEnd', () => {
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        pullUpDebounce();
      }
    });
    return () => {
      bScroll.off('scrollEnd');
    };
  }, [pullUp, pullUpDebounce, bScroll]);

  // 监听下拉刷新
  useEffect(() => {
    if (!bScroll || !pullDown) return;
    bScroll.on('touchEnd', (pos) => {
      // 下拉松手后会有一个位移，只要大于50px就执行
      if (pos.y > 50) {
        pullDownDebounce();
      }
    });
    return () => {
      bScroll.off('scrollEnd');
    };
  }, [pullDown, pullDownDebounce, bScroll]);

  // 刷新，每次都执行
  useEffect(() => {
    if (refresh && bScroll) {
      bScroll.refresh();
    }
  });

  // 对外公开refresh和better-scroll的引用
  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    },
  }));
  const { pullDownLoading, pullUpLoading } = props;
  const pullDownLoadingStyle = { display: pullDownLoading ? '' : 'none' };
  const pullUpLoadingStyle = { display: pullUpLoading ? '' : 'none' };

  return (
    <ScrollContainer ref={scrollContainerRef}>
      { props.children }
      {/* 滑倒底部加载动画 */}
      <PullUpLoading style={pullUpLoadingStyle}>

        <Loading />

      </PullUpLoading>
      {/* 顶部下来刷新动画 */}
      <PullDownLoading style={pullDownLoadingStyle}>

        <LoadingV2 />

      </PullDownLoading>
    </ScrollContainer>
  );
});

export default Scroll;

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']), // 滚动的方向
  click: PropTypes.bool, // 是否支持点击
  refresh: PropTypes.bool, // 是否刷新
  onScroll: PropTypes.func, // 滑动触发的回调函数
  pullUp: PropTypes.func, // 上拉加载逻辑
  pullDown: PropTypes.func, // 下拉加载逻辑
  pullUpLoading: PropTypes.bool, // 是否显示上拉 loading 动画
  pullDownLoading: PropTypes.bool, // 是否显示下拉 loading 动画
  bounceTop: PropTypes.bool, // 是否支持向上吸顶
  bounceBottom: PropTypes.bool, // 是否支持向下吸底
  children: PropTypes.element,
};

Scroll.defaultProps = {
  direction: 'vertical',
  click: true,
  refresh: true,
  onScroll: null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true,
  children: null,
};
