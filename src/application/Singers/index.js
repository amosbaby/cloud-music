import React, { useState } from "react";
import { alphaTypes, categoryTypes } from "../../api/horizon-data";
import Horizon from "../../baseUI/Horizon";
import { NavContainer } from "./style";

function Singers(props){
  const [category,setCategory] = useState('')
  const handleCategoryClick = (value) => {
    setCategory(value)
  }
  const [alpha,setAlpha] = useState('')
  const handleAlphaClick = (value) => {
    setAlpha(value)
  }

  return (
    <NavContainer>
      <Horizon list={categoryTypes} title="分类(默认热门): " handleClick={handleCategoryClick} preValue={category}></Horizon>
      <Horizon list={alphaTypes} title="首字母: " handleClick={handleAlphaClick} preValue={alpha}></Horizon>
    </NavContainer>
  )
}

export default React.memo(Singers)
