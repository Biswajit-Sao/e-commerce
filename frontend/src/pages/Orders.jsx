import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { MdLocalShipping } from 'react-icons/md';
import './Orders.css'; 
import axios from 'axios';

const Orders = () => {
  const { backendUrl,token, currency } = useContext(ShopContext);

  const[orderData,setOrderData]=useState([])

  const loadOrderData=async ()=>{
    try {
      if(!token){
        return null
      }

      const response=await axios.post(backendUrl+'/api/order/userorders',{},{headers:{token}})

      if(response.data.success){
        
        let allOrdersItem=[]
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status']=order.status
            item['payment']=order.payment
            item['paymentMethod']=order.paymentMethod
            item['date']=order.date
            allOrdersItem.push(item)

          })
        })
        setOrderData(allOrdersItem.reverse());
        
      }
      

    } catch (error) {
      
    }
  }
  useEffect(()=>{
    loadOrderData()
  },[token])

  return (
    <div className="orders-container">
      <div className="orders-header">
        <Title text1={'MY'} text2={'ORDERS'} />
      </div>
      <div className="orders-list">
        {orderData.map((item, index) => (
          <div key={index} className="order-item">
            <div className="order-item-details">
              <img src={item.image[0]} alt={item.name} className="order-item-image" />
              <div className="order-item-info">
                <p className="order-item-name">{item.name}</p>
                <div className="order-item-pricing">
                  <p className="order-item-price">{currency}{item.price}</p>
                  <p className="order-item-quantity">Quantity: {item.quantity}</p>
                  <p className="order-item-size">Size: {item.size}</p>
                </div>
                <p className="order-item-date">Date: <span>{new Date(item.date).toDateString()}</span></p>
                <p className="order-item-date">Payment: <span>{item.paymentMethod==="COD" ? "CASH ON DELIVERY" : "online"}</span></p>

              </div>
            </div>
            <div className="order-item-status">
              <div className="order-shipping-status">
                <MdLocalShipping className="shipping-icon" />
                <p>{item.status}</p>
              </div>
              <button onClick={loadOrderData} className="track-order-button">Track Order</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;