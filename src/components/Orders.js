import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

import styles from "./Orders.css";
import ajax from "../ajax";


export const Orders = () => {
  const token = useSelector(store=>store.token)
  const [orders, setOrders] = useState([]);
  const [query, setQuery] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    if (token) {
      ajax.get("/api/orders/get-orders", {
        headers: {"Authorization":"Bearer " + token}
      }).then(res=>{
        setOrders(res.data)
      }).catch(e=>{
        console.log(e.response || e);
      })
    }
  }, [query])

  useEffect(()=>{
    if (token) {
      ajax.get("/api/products")
      .then(res=>{
        setProducts(res.data)
      }).catch(e=>{
        console.log(e.response || e);
      })
    }
  }, [])


  if (!token) {
    return <Redirect to="/auth/sign-up"/>
  } else if (orders.length === 0) {
    return <div className={styles.EmptyOrders}>
      <p>You haven't placed any orders!</p>
    </div>
  } else if (!products) {
    return null
  } else {
    return (
      <div className={styles.Orders}>
        {orders.map((order,i)=>{
          const {
            orderId,
            address,
            phone,
            name,
            paymentReference,
            items
          } = order;

          const total = items && items.reduce((acc, curr)=>{
            const {price} = products.filter(item=> item.id === curr.itemCatalogId)[0]
            return acc + price*curr.quantity
          }, 0)

          return (
            <div key={i} className={styles.Order}>
              <div className={styles.OrderDetail}>
                <p className={styles.OrderNum}>Order number: {orderId}</p>
                <p className={styles.Name}>Name: {name}</p>
                <p className={styles.Address}>Address: {address}</p>
                <p className={styles.Phone}>Phone: {phone}</p>
                <p className={styles.Total}>Total: {total}$</p>
                <p className={styles.Hst}>Hst (13%): {Math.round(total * 0.13 * 100)/100}$</p>
                <p className={styles.Subtotal}>Subtotal: {Math.round(total * 1.13*100)/100}$</p>
              </div>

              <div className={styles.OrderedItems}>
                {items.map((item,i)=>{
                  const {
                    itemId,
                    itemCatalogId,
                    quantity,
                    sugar,
                    ice,
                    tapioca,
                    pudding,
                    grassjelly
                  } = item;

                  const {name, price} = products.filter(product=>product.id === item.itemCatalogId)[0]
                  return (
                    <div key={i} className={styles.Item}>
                      <p className={styles.ItemName}>Item: {name}</p>
                      <p className={styles.ItemQuantity}>Qty: {quantity}</p>
                      <p className={styles.ItemPrice}>Price: {price}$</p>
                      <p className={styles.Sugar}>Sugar: {sugar}%</p>
                      <p className={styles.Ice}>Ice: {ice}%</p>
                      <p className={styles.Tapioca}>{tapioca === 1 ? "+ tapioca" : ""}</p>
                      <p className={styles.Pudding}>{pudding === 1 ? "+ pudding" : ""}</p>
                      <p className={styles.Grassjelly}>{grassjelly === 1 ? "+ grassjelly" : ""}</p>
                    </div>
                )})}
              </div>

            </div>
          )
        })}
      </div>
    )
  }
}
