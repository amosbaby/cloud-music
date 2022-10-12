import React, { useEffect, useState } from 'react';
import Swiper from 'swiper';
import * as PropTypes from 'prop-types';
import SliderContainer from './style';
// eslint-disable-next-line import/no-unresolved
import 'swiper/css';

function Slider(props) {
  const [sliderSwiper, setSliderSwiper] = useState(null);
  const { bannerList } = props;

  useEffect(() => {
    if (bannerList.length && !sliderSwiper) {
      const newSwiper = new Swiper('.slider-container', {
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: { el: '.swiper-pagination' },
      });

      setSliderSwiper(newSwiper);
    }
  }, [bannerList.length, sliderSwiper]);

  return (
    <SliderContainer>
      <div className="before" />
      <div className="slider-container">
        <div className="swiper-wrapper">
          {
              bannerList.map((banner, index) => (
                <div className="swiper-slide" key={banner.imageUrl + index}>
                  <div className="slider-nav">
                    <img src={banner.imageUrl} className="slider-image" alt="推荐" />
                  </div>
                </div>
              ))
          }

        </div>
        <div className="swiper-pagination" />
      </div>
    </SliderContainer>
  );
}

Slider.propTypes = {
  bannerList: PropTypes.arrayOf(PropTypes.shape({ imageUrl: PropTypes.string })).isRequired,
};

export default React.memo(Slider);
