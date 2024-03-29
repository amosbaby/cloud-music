import styled from 'styled-components';
import GlobalStyle from '../../assets/global-style';

export const Content = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: ${(props) => (props.addBottom ? '60px' : 0)};
  z-index: 1000;
  background: ${GlobalStyle['background-color']};
  ${GlobalStyle.rightToLeftAnimation}
`;

// 添加 TopDesc 和 Menu
export const TopDesc = styled.div`
  background-size: 100%;
  padding: 5px 20px;
  padding-bottom: 50px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  height: 275px;
  position: relative;
  .background {
    z-index: -1;
    background: url(${(props) => props.background}) no-repeat;
    background-position: 0 0;
    background-size: 100% 100%;
    position: absolute;
    width: 100%;
    height: 100%;
    filter: blur(20px);
    .filter {
      position: absolute;
      z-index: 10;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.2);
    }
  }
  .img_wrapper {
    width: 120px;
    height: 120px;
    position: relative;         
    .decorate {
      position: absolute;
      top: 0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
    }
    .play_count {
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: ${GlobalStyle['font-size-s']};
      line-height: 15px;
      color: ${GlobalStyle['font-color-light']};
      display: flex;
      align-items: center;
      .play {
        margin-right: 2px;
        vertical-align: top;
      }
    }
    img {
      width: 120px;
      height: 120px;
      border-radius:3px;
    }
  }
  .desc_wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 120px;
    padding: 0 10px;
    .title {
      max-height: 70px;
      color: ${GlobalStyle['font-color-light']};
      font-weight: 700;
      line-height: 1.5;
      font-size: ${GlobalStyle['font-size-l']};
    }
    .person {
      display: flex;
      .avatar {
        width: 20px;
        height: 20px;
        margin-right: 5px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
      .name {
        line-height: 20px;
        font-size: ${GlobalStyle['font-size-m']};
        color: ${GlobalStyle['font-color-desc-v2']};
      }
    }
  }
`;

export const Menu = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 30px 20px 30px;
  margin: -100px 0 0 0;
  >div {
    display: flex;
    flex-direction: column;
    line-height: 20px;
    text-align: center;
    align-items: center;
    font-size: ${GlobalStyle['font-size-s']};
    color: ${GlobalStyle['font-color-light']};
    z-index:1000;
    font-weight: 500;
    .iconfont {
      font-size: 20px;
    }
  }
`;

export const Marquee = styled.div`
  width: 100%;
  height: 35px;
  overflow: hidden;
  position: relative;
  white-space: nowrap;

  .text {
    position: absolute;
    animation: marquee 10s linear infinite;
  }
  @keyframes marquee {
    from {
    left: 100%;
    }
    to {
    left: -100%
    }
  }
  @keyframes marquee {
    from {
    transform: translateX(100%);
    }
    to {
    transform: translateX(-100%);
    }
  }
`;
