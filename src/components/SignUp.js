import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux"

import styles from "./SignUp.css";
import {setToken} from "../redux/actions";
import ajax from "../ajax";

export const SignUp = ({originalLink}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className={styles.AuthContainer}>
      <form className={styles.SignUpBox}
        onSubmit={e=>{
          e.preventDefault();
          ajax.post("/api/auth/signup", {email, password})
            .then(e=>{
                dispatch(setToken(e.data.token));
                history.push(originalLink || "/");
            })
            .catch(e=>{
              console.log(e.response || e);
              setErrorMessage("Error")
            })
        }}
      >
        <p className={styles.SignUpTitle}>Sign up with us</p>
        <input className={styles.InputEmail}
          required
          data-cy="Email address"
          type="email"
          placeholder="Email address"
          onChange={e=>{
            setEmail(e.target.value);
          }}
          value={email}
        />

        <input className={styles.InputPassword}
          required
          data-cy="Password"
          type="password"
          placeholder="Password"
          onChange={e=>{
            setPassword(e.target.value);
          }}
          value={password}
        />

        <button type="submit" 
          data-cy="SubmitSignup"
        className={styles.SignUpButton}>
          Sign up
        </button>

        <p className={styles.ErrorMessage}>{errorMessage}</p>
        <Link 
          data-cy="LogInInsteadOfSignUp"
          to="/auth/login">
          Have an account? Login instead
        </Link>
      </form>
    </div>
  )
}