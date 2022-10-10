import styled from 'styled-components';
import GlobalStyle from '../../assets/global-style';

const HeaderContainer = styled.div`
  position: fixed;
  padding: 5px 10px;
  padding-top: 0;
  align-items: center;
  height: 40px;
  width: 100%;
  z-index: 100;
  display: flex;
  line-height: 40px;
  color: ${GlobalStyle['font-color-light']};
  .back-button {
    font-size: 24px;
    line-height: 100%;
  }
  >h1 {
    font-size: ${GlobalStyle['font-size-l']};
    font-weight: 700;
  }
`;

export default HeaderContainer;
