import React, {useContext, useState} from 'react'
import LayOut from "../../Components/LayOut/LayOut";
import classes from "./Payment.module.css";
import { DataContext } from '../../Components/DataProvider/DataProvider';
import ProductCard from "../../Components/Product/ProductCard";
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import {axiosInstance} from "../../Api/axios";
import {ClipLoader} from "react-spinners";
import { db } from '../../Utility/firebase';
import { useNavigate } from 'react-router-dom';

const Payment = () => {

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const [{user, basket}] = useContext(DataContext);
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0);

  const total = basket?.reduce((amount, item) => {
    return item.price * item.amount + amount;
  }, 0);

  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const handleChange = (e) => {
    e?.error?.message ? setCardError(e?.error?.message) : setCardError("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. contact backend to get client secret
    try {
      setProcessing(true);
      const response = await axiosInstance({
        method: "POST",
        url: `/payment/create?total=${total*100}`
      })

     
      const clientSecret = response.data.clientSecret;

      // 2. client side (react side confirmation)
      const {paymentIntent} = await stripe.confirmCardPayment(clientSecret, 
        {
          payment_method: {
            card: elements.getElement(CardElement)
          }
        })

        // 3. order firestore database to save and clear basket
        await db
          .collection("users")
          .doc(user.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created
          });
        setProcessing(false);
        navigate("/orders", {state: {msg: "You have placed your order"}});
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
    
    

  }

  return (
    <LayOut>
      {/* Header */}
      <div className={classes.payment_header}>
        Checkout ({totalItem}) items
      </div>
      {/* payment method */}
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 React Lane</div>
            <div>Chicago, IL</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {
              basket?.map((item) => <ProductCard product={item} flex={true}/>)
            }
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handleSubmit}>
                {/* card error */}
                {
                  cardError && (<small style={{color: "red", fontSize: "12px"}}>{cardError}</small>)
                }
                {/* card element */}
                <CardElement onChange={handleChange}/>
                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{display: "flex", gap: "10px"}}>
                      <p>Total Order |</p> <CurrencyFormat amount={total}/> 
                    </span>
                  </div>
                  <button type='submit'>
                    {
                      processing ? (
                        <div className={classes.loading}>
                          <ClipLoader color="gray" size={12}/> <p>Please wait...</p>
                        </div>
                      ) : 
                      "Pay Now"
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  )
}

export default Payment