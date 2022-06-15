import React from "react";
import * as propTypes from 'prop-types'
import { HeaderContainer } from "./style";

const Header = React.forwardRef((props,ref) => {
  const { handleClick,title, isMarquee } = props

  return (
    <HeaderContainer ref={ref}>
      <span className="back-button">
       <ion-icon  name="chevron-back-outline" onClick={handleClick}></ion-icon>
      </span>
      {
        isMarquee ? <marquee> <h1>{title}</h1> </marquee> : <h1>{title}</h1>
      }
    </HeaderContainer>
  )

})

Header.defaultProps = {
  handleClick: () => {},
  title:'标题',
  isMarquee: false
}

Header.propTypes = {
  handleClick: propTypes.func,
  title: propTypes.string,
  isMarquee: propTypes.bool
}

export default React.memo(Header)
