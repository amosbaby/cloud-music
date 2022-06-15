import { createGlobalStyle } from "styled-components";
/** 扩大点击区域 */
const extendClick = createGlobalStyle`
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
const noWrap = createGlobalStyle`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`
/** 从右到左动画 */
const rightToLeftAnimation=createGlobalStyle`
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


const GlobalStyle = {
  'theme-color': '#d44439',
  'theme-color-shadow': 'rgba (212, 68, 57, .5)',
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
  'background-color-shadow': 'rgba (0, 0, 0, 0.3)',
  'highlight-background-color': '#fff',
  /** 扩大点击区域 */
  extendClick,
  /** 一行文字溢出部分用...代替 */
  noWrap,
  /** 从右到左动画 */
  rightToLeftAnimation
}


export default GlobalStyle
