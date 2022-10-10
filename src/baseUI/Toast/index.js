import React, {
  forwardRef, useImperativeHandle, useRef, useState,
} from 'react';
import * as PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import ToastWrapper from './style';

const Toast = forwardRef((props, ref) => {
  const [show, setShow] = useState(true);
  const [timer, setTimer] = useState(-1);
  const { text } = props;

  const nodeRef = useRef();

  useImperativeHandle(ref, () => ({
    show() {
      // 需要做防抖
      if (timer) {
        clearTimeout(timer);
      }
      setShow(true);
      setTimer(setTimeout(() => {
        setShow(false);
      }, 3000));
    },
  }));

  return (
    <CSSTransition in={show} timeout={300} classNames="drop" unmountOnExit nodeRef={nodeRef}>
      <ToastWrapper ref={nodeRef}>
        <div className="text">

          {text}

        </div>
      </ToastWrapper>
    </CSSTransition>
  );
});

Toast.propTypes = {
  text: PropTypes.string.isRequired,
};

export default React.memo(Toast);
