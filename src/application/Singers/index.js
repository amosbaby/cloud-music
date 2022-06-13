import React, { useState } from "react";
import { alphaTypes, categoryTypes } from "../../api/horizon-data";
import Horizon from "../../baseUI/Horizon";
import { ListContainer, NavContainer } from "./style";
import { useDispatch, useSelector } from "react-redux";
import { List, ListItem } from "./style";
import Scroll from "../../components/scroll";
import { getSingerList } from "./store/actionCreators";

function Singers(props){
  
  const [category,setCategory] = useState({type:-1,area:-1,key:'1000'})
  const [alpha,setAlpha] = useState('')
  
  const singerList = useSelector((state) => {
    return state.singers.getIn(['singerList'])
  })
  const dispatch = useDispatch()
  const handleCategoryClick = (index) => {
    const value = categoryTypes[index]
    setCategory(value)
    dispatch(getSingerList(value.type,value.area,alpha))
  }

  const handleAlphaClick = (index) => {
    const value = alphaTypes[index]
    setAlpha(value.key)
    dispatch(getSingerList(category.type,category.area,value.key))
  }

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

export default React.memo(Singers)
