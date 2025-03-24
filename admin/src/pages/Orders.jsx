import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import "./Orders.css"; // Import the CSS file
import { assets } from "../assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="orders-container">
      <h2 className="orders-title">ORDER PAGE</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Items</th>
            <th>Customer Name</th>
            <th>Address</th>
            <th>Info</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index} className="order-row">
              <td>
                <img
                  className="order-image"
                  src={assets.delev}
                  alt="Order"
                />
              </td>
              <td>
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item">
                    {item.name} * {item.quantity} <span>{item.size}</span>
                  </div>
                ))}
              </td>
              <td>{order.address.firstName + " " + order.address.lastName}</td>
              <td>
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    " , " +
                    order.address.state +
                    " , " +
                    order.address.country +
                    " , " +
                    order.address.zipCode}
                </p>
                <p>Phone No. {order.address.phone}</p>
              </td>
              <td>
                <p>Items: {order.items.length}</p>
                <p>Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? "Done" : "Pending"}</p>
                <p>Date: {new Date(order.date).toLocaleDateString()}</p>
              </td>
              <td>Rs. {order.amount}</td>
              <td>
                <select
                  className="order-status"
                  onChange={(event) => statusHandler(event, order._id)}
                  value={order.status}
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for delivery">Out for delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;