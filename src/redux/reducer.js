import {createStore, applyMiddleware} from "redux";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

import {
  SET_TOKEN,
  RM_TOKEN,
  ADD_MINUS_ITEM,
} from "./actions";


const token = localStorage.getItem("alvybbt") || undefined;

const reducer = (state={
  token,
  cartItems:[],
}, action) => {
  switch (action.type) {
    case SET_TOKEN:
      localStorage.setItem("alvybbt", action.token)
      return {token: action.token}

    case RM_TOKEN:
      localStorage.removeItem("alvybbt")
      return {token: undefined}

    case ADD_MINUS_ITEM:
      return {...state,
        cartItems: action.cartItems
      }


    default:
      return state

  }
}

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export const store = createStore(reducer, composedEnhancer);

