/**
 * 使用createContext与useReducer模拟redux
 */

import React, { createContext, useReducer } from 'react';
import { fromJS } from 'immutable';

export const CategoryDataContext = createContext({});
export const UPDATE_CATEGORY = 'singers/UPDATE_CATEGORY';
export const UPDATE_ALPHA = 'singers/UPDATE_ALPHA';

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_CATEGORY:
      return state.set('category', action.data);
    case UPDATE_ALPHA:
      return state.set('alpha', action.data);
    default:
      return state;
  }
};

export function SharedStatus(props) {
  const [data, dispatch] = useReducer(reducer, fromJS({ category: { type: -1, area: -1, key: '1000' }, alpha: '' }));

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <CategoryDataContext.Provider value={{ data, dispatch }}>
      { props.children }
    </CategoryDataContext.Provider>
  );
}
