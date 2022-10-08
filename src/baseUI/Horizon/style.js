import styled from 'styled-components';
import GlobalStyle from '../../assets/global-style';

export const List = styled.div`
  display: flex;
  align-items: center;
  height: 32px;
  overflow: hidden;
  >span:first-of-type{
    display:table;
    flex: 0 0 auto;
    padding: 5px 0;
    margin-right: 5px;
    color: grey;
    font-size: ${GlobalStyle['font-size-m']};
    vertical-align: middle;
  }
`;
export const ListItem = styled.span`
  flex: 0 0 auto;
  font-size: ${GlobalStyle['font-size-m']};
  padding: 5px 8px;
  border-radius: 10px;
  &.selected {
    color: ${GlobalStyle['theme-color']};
    border: 1px solid ${GlobalStyle['theme-color']};
    opacity: 0.8;
  }
`;
