import React, { useCallback, useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import SearchBox from "./SearchBox";
import { Container } from "./style";

function Search(props){
  const [show,setShow] = useState(false)
  const containerRef = useRef()

  useEffect(()=>{
    setShow(true)
  },[])

  const [query,setQuery] = useState('')

  const handleBack = useCallback(()=>{
    setShow(false)
  },[])

  const handleQuery = useCallback((query)=>{
    setQuery(query)
  },[])

  return (
    <CSSTransition 
      in={show} 
      timeout={300}
      appear={true} 
      classNames="fly" 
      unmountOnExit 
      onExit={()=>props.history.goBack()}
      nodeRef={containerRef}
      >
          <Container ref={containerRef}>
            <div className="search_box_wrapper">
            <SearchBox back={handleBack} hotQuery={query} handleQuery={handleQuery} ></SearchBox>
            </div>
          </Container>

    </CSSTransition>
  )
}

export default React.memo(Search)
