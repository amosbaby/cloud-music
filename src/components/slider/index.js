import React,{ useEffect,useState } from "react";
import Swiper from "swiper";
import "swiper/css";
import { SliderContainer } from "./style";

function Slider(props){
  const [sliderSwiper,setSliderSwiper] = useState(null)
  const { bannerList } = props

  useEffect(()=>{
    if(bannerList.length && !sliderSwiper){
      const newSwiper = new Swiper('.slider-container',{
        loop:true,
        autoplay:{
          delay:3000,
          disableOnInteraction:false
        },
        pagination: { el:'.swiper-pagination'},
      })

      setSliderSwiper(newSwiper)
    }

  },[bannerList.length, sliderSwiper])

  return (
    <SliderContainer>
      <div className="before"></div>
      <div className="slider-container">
        <div className="swiper-wrapper">
          {
              bannerList.map(banner=>{
                  return (
                    <div className="swiper-slide" key={banner.imageUrl}>
                      <div className="slider-nav">
                        <img src={banner.imageUrl} className="slider-image" alt="推荐" />
                      </div>
                    </div>
                  )
              })
          }

        </div>
        <div className="swiper-pagination"></div>
      </div>
    </SliderContainer>
  )
}

export default React.memo(Slider)
