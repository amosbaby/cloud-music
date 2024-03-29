import React from 'react';
import * as PropTypes from 'prop-types';
import CircleWrapper from './style';

function ProgressCircle(props) {
  const { radius, percent } = props;
  // 整个背景周长
  const dashArray = Math.PI * 2 * 50;
  // 未高亮部分
  const dashOffset = (1 - Number(percent || 0)) * dashArray;

  return (
    <CircleWrapper radius={radius}>
      <svg width={radius} height={radius} viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle className="progress-background" r="50" cx="50" cy="50" fill="transparent" />
        <circle
          className="progress-bar"
          r="50"
          cx="50"
          cy="50"
          fill="transparent"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        />
      </svg>
      {props.children}
    </CircleWrapper>
  );
}

ProgressCircle.propTypes = {
  children: PropTypes.element,
  radius: PropTypes.number,
  percent: PropTypes.number,
};
ProgressCircle.defaultProps = {
  children: null,
  radius: 0,
  percent: 0,
};

export default React.memo(ProgressCircle);
