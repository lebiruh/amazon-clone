import React, { useState, useContext } from 'react'
import classes from "./SignUp.module.css";
import {Link, useNavigate} from "react-router-dom";
import {auth} from "../../Utility/firebase";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {DataContext} from "../../Components/DataProvider/DataProvider";
import { Type } from '../../Utility/action.type';
import {ClipLoader} from "react-spinners"

const Auth = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false
  });

  const [{user}, dispatch] = useContext(DataContext);

  const navigate = useNavigate();


  const authHandler = async(e) => {
    e.preventDefault();

    if(e.target.name == "signin") {
      // firebase auth
      setLoading({...loading, signIn: true});
      signInWithEmailAndPassword(auth, email, password).then((userInfo) => {
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user
        })
        setLoading({...loading, signIn: false});
        navigate("/");
      }).catch((err)=> {
        setError(err.message);
        setLoading({...loading, signIn: false});
      });
    } else {
      setLoading({...loading, signUp: true});
      createUserWithEmailAndPassword(auth, email, password).then((userInfo) => {
        dispatch({
          type: Type.SET_USER,
          user: userInfo.user
        })
        setLoading({...loading, signUp: false});
        navigate("/");
      }).catch((err) => {
        setError(err.message);
        setLoading({...loading, signUp: false});
      });
    }

  }

  return (
    <section className={classes.login}>
      <Link to="/">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" alt="" />
      </Link>
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <button type='submit' name='signin' className={classes.login_signInButton} onClick={authHandler}>
            {
              loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"
            }
          </button>
        </form>
        {/* agreement */}
        <p>
          By signing-in you agree to the AMAZON CLONE Conditions of Use & Sale. Please see your Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
        </p>
        <button type="submit" name='signup' className={classes.login_registerButton} onClick={authHandler}>
          {
            loading.signUp ? <ClipLoader color="#000" size={15} /> : "Create your Amazon Clone Account"
          }          
        </button>
        {
          error && <small style={{paddingTop: "5px", color:"red"}}>{error}</small>
        }
      </div>
    </section>
  )
}

export default Auth