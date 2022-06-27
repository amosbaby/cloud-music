import styled,{  css, keyframes, } from "styled-components";
/** 扩大点击区域 */
const extendClick = styled.div`
  position: relative;
  &::before{
    content: '';
    position: absolute;
    top: -10px;
    bottom: -10px;
    left: -10px;
    right: -10px;
  }
`
/** 一行文字溢出部分用...代替 */ 
const noWrap = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
/** 从右到左动画 */
const rightToLeftAnimation=css`
  transform-origin: right bottom;
  &.fly-enter, &.fly-appear {
    transform: translate3d(100%, 0, 0);
  }
  &.fly-enter-active, &.fly-appear-active {
    transition: transform .3s;
    transform: translate3d(0, 0, 0);
  }
  &.fly-exit {
    transform: translate3d(0, 0, 0);
  }
  &.fly-exit-active {
    transition: transform .3s;
    transform: translate3d(100%, 0, 0);
  }
`

const fadeBottomToTop=css`
  &.list-fade-enter {
    opacity: 0;
  }
  &.list-fade-enter-active {
    opacity: 1;
    transition: all 0.3s;
  }
  &.list-fade-exit {
    opacity: 1;
  }
  &.list-fade-exit-active {
    opacity: 0;
    transition: all 0.3s;
  }
`

const rotate = keyframes`
  0%{
    transform: rotate(0);
  }
  100%{
    transform: rotate(360deg);
  }
`;

const bgFull =css`
    background-position: 50%;
    background-size: contain;
    background-repeat: no-repeat;
  `

const GlobalStyle = {
  'theme-color': '#d44439',
  'theme-color-shadow': 'rgba(212, 68, 57, .5)',
  'font-color-light': '#f1f1f1',
  'font-color-desc': '#2E3030',
  'font-color-desc-v2': '#bba8a8',// 略淡
  'font-size-ss': '10px',
  'font-size-s': '12px',
  'font-size-m': '14px',
  'font-size-l': '16px',
  'font-size-ll': '18px',
  "border-color": '#e4e4e4',
  'background-color': '#f2f3f4',
  'background-color-shadow': 'rgba(0, 0, 0, 0.3)',
  'highlight-background-color': '#fff',
  /** 扩大点击区域 */
  extendClick,
  /** 一行文字溢出部分用...代替 */
  noWrap,
  /** 从右到左动画 */
  rightToLeftAnimation,
  /** 底部到顶部淡入淡出 */
  fadeBottomToTop,
  /** 旋转 */
  rotate,
  bgFull
}


export default GlobalStyle
