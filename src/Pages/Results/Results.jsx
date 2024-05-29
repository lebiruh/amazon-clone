import React, { useEffect, useState } from 'react'
import classes from "./Results.module.css"
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../Components/Product/ProductCard';

const Results = () => {

  const [results, setResults] = useState([]) 

  const {categoryName} = useParams()

  useEffect(() =>{
    axios.get(`${productUrl}/products/category/${categoryName}`)
    .then((response) => {
      setResults(response.data);
    }).catch((error) => {
      console.log(error)
    })
  }, []);



  return (
    <LayOut>
      <section>
        <h1 style={{padding: "30px"}}>Results</h1>
        <p style={{padding: "30px"}}>Category / {categoryName}</p>
        <hr />
        <div className={classes.products_container}>
          {results?.map((product) => (
            <ProductCard key={product.id} product={product}/>
          ))}
        </div>
      </section>
    </LayOut>
  )
}

export default Results