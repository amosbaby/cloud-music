import React, {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { debounce } from '../../../api/utils';
import SearchBoxWrapper from './style';

function SearchBox(props) {
  const inputRef = useRef();
  const [query, setQuery] = useState('');

  // 从父组件传来热门搜索关键字
  const { hotQuery } = props;
  // 父组件搜索关键字发请求相关处理
  const { handleQuery } = props;
  // 根据关键字是否存在判断情况按钮的显示
  const clearBtnDisplay = { display: query.length > 0 ? 'block' : 'none' };

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const clearInput = () => {
    setQuery('');
    inputRef.current.focus();
  };

  // 进入时自动获取焦点
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // 缓存并debounce查询方法
  const handleQueryDebounce = useMemo(() => debounce(handleQuery, 500), [handleQuery]);

  useEffect(() => {
    handleQueryDebounce(query);
  }, [query]);

  useEffect(() => {
    if (hotQuery !== query) {
      setQuery(hotQuery);
    }
  }, [hotQuery]);

  return (
    <SearchBoxWrapper>
      <span className="back-button" onClick={() => props.back()}>
        <ion-icon name="chevron-back-outline" />
      </span>
      <input ref={inputRef} className="box" placeholder="搜索歌曲、歌手、专辑" value={query} onChange={handleInputChange} />
      <span style={clearBtnDisplay} className="clear-button" onClick={() => clearInput()}>

        <ion-icon name="close-circle-outline" />

      </span>
    </SearchBoxWrapper>
  );
}

export default React.memo(SearchBox);
