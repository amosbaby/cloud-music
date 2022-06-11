import styled from 'styled-components';
import GlobalStyle from '../../../assets/global-style';

export const ListWrapper = styled.div`
  max-width: 100%;
  .title{
    font-weight: 700;
    padding-left: 6px;
    font-size: 14px;
    line-height: 60px;
  }
`
export const List = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
`

export const ListItem = styled.div`
  position: relative;
  width: 32%;

  .img_wrapper{
    .decorate{
      position: absolute;
      top:0;
      width: 100%;
      height: 35px;
      border-radius: 3px;
      background: linear-gradient(hsla(0,0%,43%,.4),hsla(0,0%,100%,0));
    }
    position: relative;
    /* 图片加载时需要占位，否则better-scroll不能正确获得子元素的高度，导致content的判定高度小于wrapper。
      RecommendList里的img_wrapper设置 height: 0; padding-bottom: 100%; 就是为了给图片一个占位高度 */
    height: 0;
    padding-bottom: 100%;
    .play-count{
      display: flex;
      align-items: center;
      position: absolute;
      right: 2px;
      top: 2px;
      font-size: ${GlobalStyle["font-size-s"]};
      line-height: 15px;
      color: ${GlobalStyle["font-color-light"]};
      .paly{
        vertical-align: top;
       
      }
      .count{
        margin-left: 4px;
      }
    }
    img{
      position: absolute;
      width: 100%;
      height: 100%;
      border: 3px;
    }
    .desc{
      overflow: hidden;
      margin-top: 2px;
      padding: 0 2px;
      height: 50px;
      text-align: left;
      font-size: ${GlobalStyle["font-size-s"]};
      color: ${GlobalStyle["font-color-desc"]};
    }
  }
`
