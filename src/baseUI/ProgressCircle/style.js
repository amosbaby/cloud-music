import styled from 'styled-components';
import GlobalStyle from '../../assets/global-style';

const CircleWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => `${props.radius}px`};
  width: ${(props) => `${props.radius}px`};
  svg{
    position: absolute;
  }
  circle {
    stroke-width: 8px;
    transform-origin: center;
    &.progress-background {
      transform: scale(0.9);
      stroke: ${GlobalStyle['theme-color-shadow']};
    }
    &.progress-bar {
      transform: scale(0.9) rotate(-90deg);
      stroke: ${GlobalStyle['theme-color']};
    }
  }
`;

export default CircleWrapper;
