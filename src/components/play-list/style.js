import styled from'styled-components';
import GlobalStyle from '../../assets/global-style';

export const PlayListWrapper = styled.div `
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background-color: ${GlobalStyle["background-color-shadow"]};
  .list_wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    opacity: 1;
    border-radius: 10px 10px 0 0;
    background-color: ${GlobalStyle["highlight-background-color"]};
    transform: translate3d(0, 0, 0);
    .list_close {
      text-align: center;
      line-height: 50px;
      background: ${GlobalStyle["background-color"]};
      font-size: ${GlobalStyle["font-size-l"]};
      color: ${GlobalStyle["font-color-desc"]};
    }
  }
    /* 下面是动画部分的代码 */
  ${GlobalStyle["fadeBottomToTop"]}
`;
export const ScrollWrapper = styled.div`
  height: 400px;
  overflow: hidden;
`;

export const ListHeader = styled.div `
  position: relative;
  padding: 20px 30px 10px 20px;
  .title {
    display: flex;
    align-items: center;
    >div {
      flex:1;
      .text {
        flex: 1;
        font-size: ${GlobalStyle["font-size-m"]};
        color: ${GlobalStyle["font-color-desc"]};
      }
    }
    .iconfont {
      margin-right: 10px;
      font-size: ${GlobalStyle["font-size-ll"]};
      color: ${GlobalStyle["theme-color"]};
    }
    .clear {
      ${GlobalStyle.extendClick}
      font-size: ${GlobalStyle["font-size-l"]};
    }
  }
`
export const ListContent = styled.div `
  .item {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 12px 0 12px;
    overflow: hidden;
    .current {
      flex: 0 0 20px;
      width: 20px;
      font-size: ${GlobalStyle["font-size-s"]};
      color: ${GlobalStyle["theme-color"]};
    }
    .text {
      flex: 1;
      ${GlobalStyle.noWrap}
      font-size: ${GlobalStyle["font-size-m"]};
      color: ${GlobalStyle["font-color-desc-v2"]};
      .icon-favorite {
        color: ${GlobalStyle["theme-color"]};
      }
    }
    .like {
      ${GlobalStyle.extendClick}
      margin-right: 15px;
      font-size: ${GlobalStyle["font-size-m"]};
      color: ${GlobalStyle["theme-color"]};
    }
    .delete {
      ${GlobalStyle.extendClick}
      font-size: ${GlobalStyle["font-size-s"]};
      color: ${GlobalStyle["theme-color"]};
    }
  }
`
