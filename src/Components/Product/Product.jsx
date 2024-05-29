import React, { useState, useEffect } from 'react'
import axios from 'axios';
import {productUrl} from '../../Api/endPoints';
import ProductCard from './ProductCard';
import classes from './Product.module.css';


const Product = () => {

  const [products, setProducts] = useState();

  useEffect(() => {
    axios.get(`${productUrl}/products`)
    .then((response) => {
      setProducts(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, [])


  return (
    <section className={classes.products_container}>
      {
        products?.map((singleProduct) => (
          <ProductCard product={singleProduct} key={singleProduct.id}/>
        ))
      }
    </section>
  )
}

export default Product