
import * as PropTypes from 'prop-types'
import { memo, useEffect, useRef } from 'react'
import Scroll from '../../components/scroll'
import {List, ListItem } from './style'

function Horizon(props){
  const listRef = useRef()
  
  // 加入初始化内容宽度逻辑
  useEffect(() => {
    const listDom = listRef.current
    const spanList = listDom.querySelectorAll('span')
    listDom.style.width  = Array.from(spanList).reduce((preValue,item)=> preValue + item.offsetWidth, 0) + 'px'
  },[])

  const { title,list,preValue, handleClick } = props
  

  return (
    <Scroll direction={"horizontal"}> 
      <div ref={listRef}>
        <List>
            <span> {title} </span>
            {
              list.map((item,index) => {
                return (
                  <ListItem 
                    key={item.key}
                    className={preValue === item.key ? 'selected' : ''}
                    onClick={() => handleClick(index)}
                  >
                    {item.name}
                  </ListItem>
                )
              })
            }
        </List>
      </div>
    </Scroll>
  )
}


Horizon.propType = {
  list: PropTypes.array,
  preValue: PropTypes.string,
  title: PropTypes.string,
  handleClick: PropTypes.func
}

Horizon.defaultProps = {
  list: [],
  preValue: '',
  title: '',
  handleClick : null
}

export default memo(Horizon)
