import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {productUrl} from '../../Api/endPoints';
import ProductCard from './ProductCard';
import classes from './Product.module.css';
import Loader from '../Loader/Loader';


const Product = () => {

  const [products, setProducts] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${productUrl}/products`)
    .then((response) => {
      setProducts(response.data);
      setIsLoading(false);
    }).catch((error) => {
      console.log(error);
      setIsLoading(false);
    });
  }, [])


  return (
    <>
      {
        isLoading ? <Loader /> : (<section className={classes.products_container}>
          {
          products?.map((singleProduct) => (
              <ProductCard product={singleProduct} key={singleProduct.id} renderAdd={true}/>
            ))
          }
        </section>)
      }
    </>
    
  )
}

export default Product