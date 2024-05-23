import React from 'react'
import { categoryInfo } from './categoryFullInfos';
import CategoryCard from './CategoryCard';
import classes from "./category.module.css";

const Category = () => {
  return (
    <section className={classes.category_container}>
      {
        categoryInfo.map((info) => {
          return <CategoryCard data = {info}/>
        })
      }
    </section>
  )
}

export default Category