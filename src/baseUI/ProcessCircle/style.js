import styled from 'styled-components'
import GlobalStyle from "../../assets/global-style"

export const CircleWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  circle {
    stroke-width: 8px;
    transform-origin: center;
    &.progress-background {
      transform: scale(0.9);
      stroke: ${GlobalStyle["theme-color-shadow"]};
    }
    &.progress-bar {
      transform: scale(0.9) rotate(-90deg);
      stroke: ${GlobalStyle["theme-color"]};
    }
  }
`
