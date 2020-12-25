import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import styles from "./ProductsView.css";
import ajax from "../ajax";

export const ProductsView = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    return ajax.get("/api/products")
      .then(res=>{
        setProducts(res.data);
      })
      .catch(e=>{console.log('error in ajax request ProductsView')})
  }, [])

  return (
    <div className={styles.ProductsView}>
      {products.map(item=>{
          return (
            <div data-cy="ProductThumbnail"
              key={item.id} 
              className={styles.ProductThumbnail}>
              <Link to={"/product/" + item.id} className={styles.Link}>
                <img src={"/assets/" + item.thumbnail} alt={item.thumbnail} 
                  className={styles.Img}/>
              </Link>
              <p className={styles.Name}>{item.name}</p>
              <p className={styles.Price}>${item.price}</p>
            </div>
          )
        })}
    </div>
  )
}