import styled from 'styled-components';
import GlobalStyle from '../../assets/global-style';

export const Container = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: black;
  ${GlobalStyle.rightToLeftAnimation}
`;
export const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 75%;
  transform-origin: top;
  background: url(${(props) => props.bgUrl});
  background-size: cover;
  z-index: 50;
  .filter {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(7, 17, 27, 0.3);
  }
`;
export const CollectButton = styled.div`
  position: absolute;
  left: 0; right: 0;
  margin: auto;
  box-sizing: border-box;
  width: 120px;
  height: 40px;
  margin-top: -55px;
  z-index:50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${GlobalStyle['theme-color']};
  color: ${GlobalStyle['font-color-light']};
  border-radius: 20px;
  font-size: 0;
  line-height: 40px;
  ion-icon {
    display: inline-block;
    font-size: 20px;
    vertical-align: 1px;
  }
  .text {
    display: inline-block;
    font-size:14px;
    letter-spacing: 5px;
  }
`;
export const BgLayer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: white;
  border-radius: 10px;
  z-index: 50;
`;

export const SongListWrapper = styled.div`
  position: absolute;
  z-index: 50;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  >div {
    position: absolute;
    left: 0;
    width: 100%;
    overflow: visible;
  }
`;
