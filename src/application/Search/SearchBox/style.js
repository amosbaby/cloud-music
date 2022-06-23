import styled from 'styled-components'
import GlobalStyle from '../../../assets/global-style'

export const SearchBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  padding-right: 20px;
  height: 40px;
  background: ${GlobalStyle["theme-color"]};
  .icon-back {
    font-size: 24px;
    color: ${GlobalStyle["font-color-light"]};
  }
  .box {
    flex: 1;
    margin: 0 5px;
    line-height: 18px;
    background: ${GlobalStyle["theme-color"]};
    color: ${GlobalStyle["highlight-background-color"]};
    font-size: ${GlobalStyle["font-size-m"]};
    outline: none;
    border: none;
    border-bottom: 1px solid rgba(255,255,255,0.2);
    &::placeholder {
      color: ${GlobalStyle["font-color-light"]};
    }
  }
  .icon-delete {
    font-size: 16px;
    color: ${GlobalStyle["background-color"]};
  }
  .back-button{
    font-size: 24px;
  }
  .clear-button {
    font-size: 12px;
    line-height: 100%;
    color: lightgray;
    ${GlobalStyle.extendClick}
}

`
