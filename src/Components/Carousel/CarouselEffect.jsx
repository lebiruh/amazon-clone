import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { img } from "./img/data";
import classes from "./Carousel.module.css";

const CarouselEffect = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {
          img.map((imgItem) => {
            return <img src={imgItem} alt=''/>
          })
        }
      </Carousel>
      <div className={classes.hero_img}>

      </div>
      
    </div>
  )
}

export default CarouselEffect;