import React, {useRef} from "react"
import { useState } from "react"
import { Content } from "./style"
import {CSSTransition} from 'react-transition-group'
import Header from "../../baseUI/Header"

export function Album(props){
  const [showStatus,setShowStatus] = useState(true)

  const nodeRef = useRef()
  const handleBackClick = ()=>{
    setShowStatus(false)
  }

  return (

  <CSSTransition
      in={showStatus}  
      timeout={300} 
      classNames="fly" 
      appear={true} 
      unmountOnExit
      onExited={props.history.goBack}
      nodeRef={nodeRef}
    >
      
      <Content ref={nodeRef}>
      <Header  title={'返回'} handleClick={handleBackClick}></Header>
      </Content> 
     
    </CSSTransition>
  )
}

export default React.memo(Album) 
