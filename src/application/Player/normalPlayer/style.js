import styled from 'styled-components';
import GlobalStyle from '../../../assets/global-style';
import needle from './needle.png';

export const NormalPlayerContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 150;
  background: ${GlobalStyle['background-color']};
  .background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.6;
    filter: blur(20px);
    &.layer {
      background: ${GlobalStyle['font-color-desc']};
      opacity: 0.3;
      filter: none;
    }
  }
  &.normal-enter,
  &.normal-exit-done {
    .top {
      transform: translate3d(0, -100px, 0);
    }
    .bottom {
      transform: translate3d(0, 100px, 0);
    }
  }
  &.normal-enter-active,
  &.normal-exit-active {
    .top,
    .bottom {
      transform: translate3d(0, 0, 0);
      transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
    }
    opacity: 1;
    transition: all 0.4s;
  }
  &.normal-exit-active {
    opacity: 0;
  }
`;
export const Top = styled.div`
  position: relative;
  margin-bottom: 25px;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 50;
    ion-icon {
      display: block;
      padding: 9px;
      font-size: 24px;
      color: ${GlobalStyle['font-color-desc']};
      font-weight: bold;
      /* transform: rotate(90deg); */
    }
  }
  .title {
    width: 70%;
    margin: 0 auto;
    line-height: 40px;
    text-align: center;
    font-size: ${GlobalStyle['font-size-l']};
    color: ${GlobalStyle['font-color-desc']};
    ${GlobalStyle.noWrap};
  }
  .subtitle {
    line-height: 20px;
    text-align: center;
    font-size: ${GlobalStyle['font-size-m']};
    color: ${GlobalStyle['font-color-desc-v2']};
    ${GlobalStyle.noWrap};
  }
`;
export const Middle = styled.div`
  position: fixed;
  width: 100%;
  top: 80px;
  bottom: 170px;
  white-space: nowrap;
  font-size: 0;
  overflow: hidden;
`;
export const CDWrapper = styled.div`
  position: absolute;
  margin: auto;
  top: 10%;
  left: 0;
  right: 0;
  width: 80%;
  box-sizing: border-box;
  height: 80vw;
  .needle {
    position: absolute;
    top: -16.67vw;
    left: 30vw;
    width: 25vw;
    height: 40vw;
    z-index: 100;
    background-image: url(${needle});
    ${GlobalStyle.bgFull};
    transform-origin: 4.5vw 4.5vw;
    transition: all 0.3s;
    transform: rotate(0);
    &.pause {
      transform: rotate(-30deg);
    }
  }
  .cd {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    .image {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid rgba(255, 255, 255, 0.1);
    }
    .play {
      animation: ${GlobalStyle.rotate} 20s linear infinite;
      &.pause {
        animation-play-state: paused;
      }
    }
  }
  .playing_lyric {
    margin-top: 20px;
    font-size: 14px;
    line-height: 20px;
    white-space: normal;
    text-align: center;
    color: rgba(255, 255, 255, 0.5);
  }
`;

export const Bottom = styled.div`
  position: absolute;
  bottom: 50px;
  width: 100%;
`;
export const ProgressWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  margin: 0px auto;
  padding: 10px 0;
  .time {
    color: ${GlobalStyle['font-color-desc']};
    font-size: ${GlobalStyle['font-size-s']};
    flex: 0 0 30px;
    line-height: 30px;
    width: 30px;
    &.time-l {
      text-align: left;
      margin-right: 5px;
    }
    &.time-r {
      text-align: right;
    }
  }
  .progress-bar-wrapper {
    flex: 1;
  }
`;
export const Operators = styled.div`
  display: flex;
  align-items: center;
  .icon {
    font-weight: 300;
    flex: 1;
    color: ${GlobalStyle['font-color-desc']};
    &.disable {
      color: ${GlobalStyle['theme-color-shadow']};
    }
    ion-icon {
      font-weight: 300;
      font-size: 30px;
    }
  }
  .i-left {
    text-align: right;
  }
  .i-center {
    padding: 0 20px;
    text-align: center;
    ion-icon {
      font-size: 40px;
    }
  }
  .i-right {
    text-align: left;
  }
  .icon-favorite {
    color: ${GlobalStyle['theme-color']};
  }
`;
export const LyricContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;
export const LyricWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  box-sizing: border-box;
  text-align: center;
  p {
    line-height: 32px;
    color: rgba(255, 255, 255, 0.5);
    white-space: normal;
    font-size: ${GlobalStyle['font-size-l']};
    &.current {
      color: #fff;
    }
    &.pure {
      position: relative;
      top: 30vh;
    }
  }
`;

export const SpeedButtonList = styled.div`
  width: 70%;
  margin: auto;
  display: flex;
  align-items: center;
  height: 30px;
  justify-content: space-around;
  overflow: hidden;
  >span:first-of-type {
    display: block;
    flex: 0 0 auto;
    padding: 5px 0;
    color: ${GlobalStyle['font-color-desc-v2']};
    font-size: ${GlobalStyle['font-size-m']};
    vertical-align: middle;
  }
`;
export const SpeedButton = styled.span`
  flex: 0 0 auto;
  font-size: ${GlobalStyle['font-size-m']};
  padding: 5px 5px;
  border-radius: 10px;
  color: ${GlobalStyle['font-color-desc-v2']};
  &.selected {
    color: ${GlobalStyle['theme-color']};
    border: 1px solid ${GlobalStyle['theme-color']};
    opacity: 0.8;
  }
`;
