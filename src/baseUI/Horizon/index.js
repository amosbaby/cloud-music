import React, { memo, useEffect, useRef } from 'react';
import * as PropTypes from 'prop-types';
import Scroll from '../../components/scroll';
import { List, ListItem } from './style';

function Horizon(props) {
  const listRef = useRef();

  // 加入初始化内容宽度逻辑
  useEffect(() => {
    const listDom = listRef.current;
    const spanList = listDom.querySelectorAll('span');
    listDom.style.width = `${Array.from(spanList).reduce((preValue, item) => preValue + item.offsetWidth, 0)}px`;
  }, []);

  const {
    title, list, preValue, handleClick,
  } = props;

  return (
    <Scroll direction="horizontal">
      <div ref={listRef}>
        <List>
          <span>
            {title}
          </span>
          {
              list.map((item, index) => (
                <ListItem
                  key={item.key}
                  className={preValue === item.key ? 'selected' : ''}
                  onClick={() => handleClick(index)}
                >
                  {item.name}
                </ListItem>
              ))
            }
        </List>
      </div>
    </Scroll>
  );
}

Horizon.propTypes = {
  list: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string, name: PropTypes.string })),
  preValue: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func,
};

Horizon.defaultProps = {
  list: [],
  preValue: '',
  title: '',
  handleClick: null,
};

export default memo(Horizon);
