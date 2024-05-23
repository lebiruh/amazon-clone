import React from 'react'
import LayOut from '../../Components/LayOut/LayOut';
import Carousel from "../../Components/Carousel/CarouselEffect";
import Category from '../../Components/Category/Category';

const Landing = () => {
  return (
    <LayOut>
      <Carousel />
      <Category />
    </LayOut>
  )
}

export default Landing