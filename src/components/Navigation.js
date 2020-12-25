import React from "react";
import {Link} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import axios from "axios";

import styles from "./Navigation.css";
import {rmToken} from "../redux/actions";

export const Navigation = () => {
  const token = useSelector(store=>store.token);
  const dispatch = useDispatch();
  return (
    <div>
      <div className={styles.TopBannerContainer}>
        <a className={styles.BlogLink}
          href="https://github.com/alvyjudy/alveoli-bubble-tea-shop-frontend">
          <img className={styles.GithubLogo}
               src="https://cdn.iconscout.com/icon/free/png-512/github-153-675523.png"/>
        </a>
        <a href="https://alvyjudy-58477.medium.com/creating-a-website-for-a-bubble-tea-shop-v1-1-14ff3b397781"
           className={styles.BlogLink}            
        >blog</a>

        { !token &&
          <Link to="/auth/sign-up"
                className={styles.SignUpButton}
                data-cy="SignUpButton"
          >Sign up</Link>
        }

        { token && 
          <button className={styles.SignUpButton}
            data-cy='LogOutButton'
            onClick={e=>{
              e.preventDefault();
              dispatch(rmToken());
              axios({
                method: "post",
                url:"/api/auth/logout",
                headers: {"Authorization":"Bearer " + token}
              })
            }}
          >Log out</button>
        }

      </div>
      <div className={styles.container}>
         <Link to="/">
          <img className={styles.logo} 
          src="/assets/logo.svg" 
          alt="Home"/>
        </Link>

        <Link to="/products" className={styles.button} data-cy='Products'>
          <span className={styles.ButtonText}>Products</span>
        </Link>

        <Link to="/cart" className={styles.button} data-cy="Cart">
          <span className={styles.ButtonText}>Cart</span>
        </Link>

        <Link to="/orders" className={styles.button} data-cy="Orders">
          <span className={styles.ButtonText}>Orders</span>
        </Link>



        
      </div>
    </div>
    
  )
}

