import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link, useHistory, Redirect} from "react-router-dom";

import styles from "./Cart.css";
import ajax from "../ajax";



export const Cart = () => {
  const history = useHistory();
  const token = useSelector(store=>store.token);
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState(true);
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();

  const modifyItem = ({itemId, quantity, sugar, ice, tapioca, pudding, grassjelly}) => {
    return ajax.put("/api/cart/modify-item", {
      itemId,
      quantity,
      sugar,
      ice,
      tapioca,
      pudding,
      grassjelly,
    },{
      headers:{
        "Content-Type":"application/json",
        "Authorization":"Bearer "+token
      }
    }).then(e=>{
        setQuery(!query)
    }).catch(e=>{
      console.log(e.response || e)
    })
  }

  useEffect(()=>{
    if (token) {
      ajax.get("/api/products")
      .then(res=>{
        setProducts(res.data)
      })
      .catch(e=>{
        console.log(e.response || e);
      })
    }
  }, [])

  useEffect(()=>{
    if (token) {
      ajax.get("/api/cart/get-items", {
        headers:{"Authorization":"Bearer "+token}
      }).then(res=>{
          setItems(res.data) //[{itemId, itemCatalogId, quantity, sugar, ice, tapioca, pudding, grassjelly}, ...] .
      }).catch(e=>{
        console.log(e.response || e)
      })
    }
  }, [query])

  if (!token) {
    return <Redirect to="/auth/sign-up"/>
  } else if (items.length === 0 || products.length === 0) {
    return (
      <div className={styles.EmptyCart}>
        <p className={styles.EmptyCartText}>Your cart is empty!</p>
      </div>
    )
  } else {
    const total = items.reduce((acc, curr)=>{
      const {price} = products.filter(item=> item.id === curr.itemCatalogId)[0]
      return acc + price*curr.quantity
    }, 0)

    return (
      <div className={styles.Cart}>
        {items.map((item, i)=>{
          const {itemId,
            itemCatalogId,
            quantity,
            sugar,
            ice,
            tapioca,
            pudding,
            grassjelly} = item;

        
          const {thumbnail, name, price} = products.filter(each=>{
            return each.id === itemCatalogId
          })[0]

          return (
            <div key={i} className={styles.CartItem}>
              <img src={"/assets/"+thumbnail} 
                className={styles.CartItemPic}/>
              <p className={styles.ProductName}>{name}</p>
              <p className={styles.ProductPrice}>${price}</p>

              <div className={styles.ProductQuantityContainer}>
                <p className={styles.ProductQuantity}>Qty: {quantity}</p>
                <button className={styles.AddButton}
                  onClick={e=>{
                    e.preventDefault();
                    modifyItem({
                      itemId,
                      quantity: quantity + 1,
                      sugar,
                      ice,
                      tapioca,
                      pudding,
                      grassjelly,
                    })
                  }}
                >+</button>
                <button className={styles.MinusButton}
                  onClick={e=>{
                    e.preventDefault();
                    modifyItem({
                      itemId,
                      quantity: Math.max(1, quantity - 1),
                      sugar,
                      ice,
                      tapioca,
                      pudding,
                      grassjelly,
                    })
                  }}
                >-</button>
              </div>

              <button className={styles.RemoveButton}
                onClick={e=>{
                  e.preventDefault();
                  ajax.delete("/api/cart/remove-item", {
                    headers:{
                      "Content-Type":"application/json",
                      "Authorization":"Bearer "+token
                    },
                    data: {itemId}
                  }).then(e=>{
                    setQuery(!query)
                  }).catch(e=>{console.log(e.response || e)})
                }}
              >delete</button>

              <div className={styles.Options}>
                <div className={styles.Option}>
                  <p className={styles.OptionName}>Sugar</p>
                  <div className={styles.Amount}>{sugar}%</div>
                  <button className={styles.Add}
                    onClick={e=>{
                      e.preventDefault();
                      modifyItem({
                        itemId,
                        quantity,
                        sugar: Math.min(sugar + 20, 100),
                        ice,
                        tapioca,
                        pudding,
                        grassjelly,
                      })
                    }}
                  >+</button>
                  <button className={styles.Minus}
                    onClick={e=>{
                      e.preventDefault();
                      modifyItem({
                        itemId,
                        quantity,
                        sugar: Math.max(sugar - 20, 0),
                        ice,
                        tapioca,
                        pudding,
                        grassjelly,
                      })
                    }}
                  >-</button>
                </div>
                

                <div className={styles.Option}>
                  <p className={styles.OptionName}>Ice</p>
                  <div className={styles.Amount}>{ice}%</div>
                  <button className={styles.Add}
                    onClick={e=>{
                      e.preventDefault();
                      modifyItem({
                        itemId,
                        quantity,
                        sugar,
                        ice: Math.min(ice + 20, 100),
                        tapioca,
                        pudding,
                        grassjelly,
                      })
                    }}
                  >+</button>
                  <button className={styles.Minus}
                    onClick={e=>{
                      e.preventDefault();
                      modifyItem({
                        itemId,
                        quantity,
                        sugar,
                        ice: Math.max(ice - 20, 0),
                        tapioca,
                        pudding,
                        grassjelly,
                      })
                    }}
                  >-</button>
                </div>

                <div className={styles.Option}>
                  <p className={styles.OptionName}>Tapioca</p>
                  <div className={styles.Amount}>{tapioca}</div>
                  <button className={styles.Add}
                    onClick={e=>{
                      e.preventDefault();
                      modifyItem({
                        itemId,
                        quantity,
                        sugar,
                        ice,
                        tapioca: Math.min(tapioca + 1, 1),
                        pudding,
                        grassjelly,
                      })
                    }}
                  >+</button>
                  <button className={styles.Minus}
                    onClick={e=>{
                      e.preventDefault();
                      modifyItem({
                        itemId,
                        quantity,
                        sugar,
                        ice,
                        tapioca: Math.max(tapioca - 1, 0),
                        pudding,
                        grassjelly,
                      })
                    }}
                  >-</button>
                </div>

                <div className={styles.Option}>
                  <p className={styles.OptionName}>Pudding</p>
                  <div className={styles.Amount}>{pudding}</div>
                  <button className={styles.Add}
                    onClick={e=>{
                      e.preventDefault();
                      modifyItem({
                        itemId,
                        quantity,
                        sugar,
                        ice,
                        tapioca,
                        pudding: Math.min(pudding + 1, 1),
                        grassjelly,
                      })
                    }}
                  >+</button>
                  <button className={styles.Minus}
                    onClick={e=>{
                      e.preventDefault();
                      modifyItem({
                        itemId,
                        quantity,
                        sugar,
                        ice,
                        tapioca,
                        pudding: Math.max(pudding - 1, 0),
                        grassjelly,
                      })
                    }}
                  >-</button>
                </div>

                <div className={styles.Option}>
                  <p className={styles.OptionName}>Grassjelly</p>
                  <div className={styles.Amount}>{grassjelly}</div>
                  <button className={styles.Add}
                    onClick={e=>{
                      e.preventDefault();
                      modifyItem({
                        itemId,
                        quantity,
                        sugar,
                        ice,
                        tapioca,
                        pudding,
                        grassjelly: Math.min(grassjelly + 1, 1),
                      })
                    }}
                  >+</button>
                  <button className={styles.Minus}
                    onClick={e=>{
                      e.preventDefault();
                      modifyItem({
                        itemId,
                        quantity,
                        sugar,
                        ice,
                        tapioca,
                        pudding,
                        grassjelly: Math.max(grassjelly - 1, 0),
                      })
                    }}
                  >-</button>
                </div>
              </div>

       
            </div> 
          )})} 

          <form className={styles.CheckOutBox}
            onSubmit={e=>{
              e.preventDefault();
              ajax.post("/api/orders/place-order", {
                address,
                phone,
                name
              }, {
                headers: {
                  "Content-Type":"application/json",
                  "Authorization":"Bearer "+token
                }
              }).then(res=>{
                history.push("/orders");
              }).catch(e=>{
                console.log("Error in checkout button", e);
              })
            }}
          >

            <input className={styles.OrderName} 
              data-cy="OrderName"
              required
              placeholder="Name"
              onChange={e=>{
                e.preventDefault();
                setName(e.target.value);
              }}
            />

            <input className={styles.OrderAddress}
              data-cy="Address"
              required
              placeholder="Address"
              onChange={e=>{
                e.preventDefault();
                setAddress(e.target.value);
            }}/>

            <input className={styles.OrderPhone}
              data-cy="Phone"
              required
              type="text"
              placeholder="Phone number"
              onChange={e=>{
                e.preventDefault();
                setPhone(e.target.value);
              }}
            />
            <p className={styles.Total}>Total: {total}$</p>   
            <p className={styles.Hst}>HST(13%) {Math.round(total * 0.13 * 100)/100}$</p>
            <p className={styles.Subtotal}>Subtotal: {Math.round(total * 1.13*100)/100}$</p>
            <button className={styles.CheckOutButton}
              data-cy="CheckOutButton"
            >Place your order</button>
          </form>
          
      </div>
    )
  }

  
}

