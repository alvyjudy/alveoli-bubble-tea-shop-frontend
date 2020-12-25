import React, {useState} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch, useHistory} from "react-router-dom";
import {Provider, useSelector, useDispatch} from "react-redux";



import {store} from "./redux/reducer";
import {Navigation} from "./components/Navigation";
import {ProductsView} from "./components/ProductsView";
import {ProductDetail} from "./components/ProductDetail";
import {NoMatch} from "./components/NoMatch";
import {Home} from "./components/Home";
import {SignUp} from "./components/SignUp";
import {Login} from "./components/Login";
import {Cart} from "./components/Cart";
import {Orders} from "./components/Orders";
import ajax from "./ajax";
import {rmToken} from "./redux/actions";

const AppInit = () => {
  return (
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>
  )
}
const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(store=>store.token);
  if (token) {
    ajax.post("/api/auth/validate-token",{},
      {headers:{Authorization:"Bearer "+token}}
    ).catch(e=>{
      console.log("Token invalid");
      dispatch(rmToken(token));
    })
  }
  

  return (
    <>
      <Navigation/>
      
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>

        <Route path="/products">
          <ProductsView/>
        </Route>

        <Route path="/product/:id">
          <ProductDetail /> {/*useParams to grab id value*/}
        </Route>

        <Route path="/auth/sign-up">
          <SignUp/>
        </Route>

        <Route path="/auth/login">
          <Login/>
        </Route>

        <Route path="/cart">
          <Cart/>
        </Route>

        <Route path="/orders">
          <Orders/>
        </Route>

        <Route>
          <NoMatch/>
        </Route>
      </Switch>
    </>
  )
}

ReactDOM.render(<AppInit />, document.getElementById("root"));