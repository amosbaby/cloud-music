import styled from 'styled-components'

export const Content = styled.div`
  position: fixed;
  top: 94px;
  bottom: ${props=>props.addBottom ? '60px' : 0};
  width: 100%;
`
