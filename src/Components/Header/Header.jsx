import React from 'react'
import classes from './Header.module.css';
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from './LowerHeader';


const Header = () => {
  return (
    <>
    <section>
      <div className={classes.header_container}>
        <div className={classes.logo_container}>
          { /*logo*/ }
          <a href="/">
            <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon logo" />
          </a>
          {/*delivery*/}
          <div className={classes.delivery}>
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p>Delivered to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>
        <div className={classes.search}>
          {/*search*/}
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" placeholder='search product'/>
          <BsSearch size={25}/>
        </div>
        {/* right side link */}
        <div className={classes.order_container}>
          <a href='/' className={classes.language}>
            <img src="https://cdn.pixabay.com/photo/2012/04/10/16/22/united-26177_640.png" alt="" />
            <select>
              <option value="">EN</option>
            </select>
          </a>
          {/* three components */}
          <a href="/">
            <p>Sign In</p>
            <span>Account & Lists</span>      
          </a>
          {/* orders */}
          <a href="/">
            <p>returns</p>
            <span>& orders</span>
          </a>
          {/* cart */}
          <a href="/" className={classes.cart}>
            <BiCart size={35}/>
            <span>0</span>
          </a>
        </div>
      </div>
    </section>
    <LowerHeader />
    </>
  )
}

export default Header