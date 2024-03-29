import styled from 'styled-components';
import GlobalStyle from '../../assets/global-style';

export const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px 10px;
  background-color: ${GlobalStyle['theme-color']};
  &>span {
    line-height: 40px;
    color: #f1f1f1;
    font-size: 20px;
  }
  .search-button{
    ${GlobalStyle.extendClick}
  }
`;
export const Tab = styled.div`
  height: 44px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: ${GlobalStyle['theme-color']};
  a{
    flex: 1;
    padding: 2px 0;
    font-size: 14px;
    color: #e4e4e4;
    &.selected{
      span{
        padding: 3px 0;
        font-weight: 700;
        color:#f1f1f1;
        border-bottom: 2px solid #f1f1f1;
      }
    }
  }
`;
export const TabItem = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
