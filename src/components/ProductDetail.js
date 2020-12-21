import React, {useState, useEffect} from "react";
import {useParams, useHistory, Redirect} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import styles from "./ProductDetail.css";
import {addMinusItem} from "../redux/actions";
import {SignUp} from "./SignUp";
import ajax from "../ajax";

export const ProductDetail = () => {
  const {id} = useParams();
  const [product, setProduct] = useState();

  useEffect(()=>{
    return ajax.get("/api/products")
      .then(res=>{
        
        const product = res.data.filter(item=>{
          return item.id.toString() === id
        })[0]
  
        setProduct(product)
      })
  }, [])

  return ( product ? 
    <div className={styles.ProductDetail}>
      <ImageViewer id={product.id} mainPic={product.mainPic} sidePics={product.sidePics}/>
      <Purchase id={product.id} name={product.name} price={product.price}/>
    </div> : <div>loading</div>
  )
  
}

const ImageViewer = ({mainPic, sidePics}) => {
  const [picture, setPicture] = useState();
  return (
    <div className={styles.ImageViewer}>
      <div className={styles.DisplayPicContainer}>
        <img src={"/assets/" + (picture || mainPic)} 
          className={styles.DisplayPic}
        />
      </div>

      <div className={styles.SidePics}>

        <div className={styles.NavThumbContainer}
          onClick={e=>{
            e.preventDefault();
            setPicture(mainPic);
          }}
        >
          <img src={"/assets/" + mainPic} className={styles.NavThumbnail}/>
        </div>

        {sidePics && sidePics.map((item, i)=>{
          return (
            <div key={i} 
              className={styles.NavThumbContainer}
              onClick={e=>{
                e.preventDefault();
                setPicture(item)
              }}>
              <img src={"/assets/" + item}
                className={styles.NavThumbnail}
              />
            </div>
          )
        })}
      </div>
      
    </div>
  )
}

const Purchase = ({name, price, id}) => {
  const history = useHistory();
  const token = useSelector(store=>store.token);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);


  return (
    <div className={styles.Purchase}>
      <p className={styles.Name}>{name}</p>
      <p className={styles.Price}>$ {price}</p>
      
      <div className={styles.AdjustQuantity}>
        <p className={styles.Quantity}>Quantity</p>
        <input className={styles.InputNum}
          value={quantity}
          onChange={e=>{
            e.preventDefault();
            setQuantity(e.target.value);
          }}
        />
        <button className={styles.PlusBut}
          onClick={(e)=>{
            e.preventDefault();
            setQuantity(quantity + 1)
          }}
        >+</button>
        <button className={styles.MinusBut}
          onClick={e=>{
            e.preventDefault();
            setQuantity(quantity === 1 ? 1 : quantity - 1 );
          }}
        >-</button>
      </div>

      <button className={styles.AddToCart}
        onClick={e=>{
          e.preventDefault();
          if (token !== undefined) {
            ajax.post("/api/cart/add-item-entry", {
              itemCatalogId:id,
              quantity,
              sugar: 100,
              ice: 100,
              tapioca: 0,
              pudding: 0,
              grassjelly: 0,
            }, {
              headers: {
                "Content-Type":"application/json",
                "Authorization": "Bearer " + token
              }
            }).then(res=>{
              history.push("/cart");
            }).catch(e=>{
              console.log(e)
            })
          } else {
            history.push("/auth/sign-up")
          }
          
        }}
      >Add to cart</button>
      <button className={styles.BuyItNow}>Buy it now</button>
      
    </div>
  )
}
