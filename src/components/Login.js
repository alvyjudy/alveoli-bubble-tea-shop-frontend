import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {useDispatch} from "react-redux"

import ajax from "../ajax.js";
import styles from "./Login.css";
import {setToken} from "../redux/actions";

export const Login = ({originalLink}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className={styles.AuthContainer}>
      <form className={styles.LoginBox}
        onSubmit={e=>{
          e.preventDefault();
          ajax.post("/api/auth/login", {email, password})
            .then(e=>{
                dispatch(setToken(e.data.token));
                history.push(originalLink || "/");
            })
            .catch(e=>{
              if (e.response) {
                console.log(e.response)
                setErrorMessage("Error")
              } else {
                console.log(e)
                setErrorMessage("Error")
              }
            })
        }}>

        <p className={styles.LoginTitle}>Login to your account</p>

        <input className={styles.InputEmail}
          data-cy="Email address"
          required
          type="email"
          placeholder="Email address"
          onChange={e=>{
            e.preventDefault();
            setEmail(e.target.value);
          }}
          value={email}
        />

        <input className={styles.InputPassword}
          data-cy="Password"
          required
          type="password"
          placeholder="Password"
          onChange={e=>{
            e.preventDefault();
            setPassword(e.target.value);
          }}
          value={password}
        />

        <button type="submit" 
          data-cy="SubmitLogin"
          className={styles.LoginButton}>
          Login
        </button>

        <p className={styles.ErrorMessage}>{errorMessage}</p>
        <Link to="/auth/sign-up">Sign up for an account!</Link>
      </form>
    </div>
  )
}