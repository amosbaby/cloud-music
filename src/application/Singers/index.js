import React, { useState } from "react";
import { alphaTypes, categoryTypes } from "../../api/horizon-data";
import Horizon from "../../baseUI/Horizon";
import { ListContainer, NavContainer } from "./style";
import { mapStateToProps,mapDispatchToProps } from "./store/utils";
import { connect } from "react-redux";
import { List, ListItem } from "./style";
import Scroll from "../../components/scroll";

function Singers(props){
  
  const [category,setCategory] = useState('')
  const [alpha,setAlpha] = useState('')
  const {getSingerListDispatch} = props
  const handleCategoryClick = (index) => {
    const value = categoryTypes[index]
    setCategory(value)
    getSingerListDispatch(value,alpha)
  }

  const handleAlphaClick = (index) => {
    const value = alphaTypes[index]
    setAlpha(value.key)
    getSingerListDispatch(category,value.key)
  }


  const {singerList} = props

  const singersListJS = singerList ? singerList.toJS() : []

  const renderSingerList = ()=>{
    return (
      <List>
        {
          singersListJS.map((item,index)=>{
            return (
              <ListItem key={item.accountId+''+index}>
                <div className="img_wrapper">
                  <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music" />
                  <span className="name"> {item.name} </span>
                </div>
              </ListItem>
            )
          })
        }
      </List>
    )
  }

  return (
   <div>
    <NavContainer>
      <Horizon list={categoryTypes} title="分类(默认热门): " handleClick={handleCategoryClick} preValue={category.key}></Horizon>
      <Horizon list={alphaTypes} title="首字母: " handleClick={handleAlphaClick} preValue={alpha}></Horizon>
    </NavContainer>
    <ListContainer>
      <Scroll>
        { renderSingerList() }
      </Scroll>
    </ListContainer>
   </div>
  )
}

export default connect(mapStateToProps,mapDispatchToProps)(React.memo(Singers))
