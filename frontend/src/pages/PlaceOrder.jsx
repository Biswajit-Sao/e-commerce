import React, { useContext, useState } from "react";
import axios from "axios";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { SiRazorpay } from "react-icons/si";
import { ShopContext } from "../context/ShopContext";
import "./PlaceOrder.css";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    cartItems,
    backendUrl,
    token,
    setCartItes,
    getCartAmount,
    delivery_fee,
    products,
  } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to place order
  const handlePlaceOrder = async () => {
    try {
      let orderItems = [];

      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      };
      switch (method) {
        case "cod":
          const response=await axios.post(backendUrl+'/api/order/place',orderData,{headers:{token}})
          console.log(response.data);
          
          if(response.data.success){
            setCartItes({})
            navigate('/orders')
            toast.success(response.data.message)
          }else{
            toast.error(response.data.message)
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
  };

  return (
    <div className="place-order-container">
      {/* Left side - Delivery Information */}
      <div className="delivery-info-section">
        <Title text1="DELIVERY" text2="INFORMATION" />
        <div className="name-fields">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="street"
          placeholder="Street"
          onChange={handleChange}
          required
        />
        <div className="city-state-fields">
          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            onChange={handleChange}
            required
          />
        </div>
        <div className="zip-country-fields">
          <input
            type="number"
            name="zipCode"
            placeholder="ZipCode"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="number"
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          required
        />
      </div>

      {/* Right side - Payment Information */}
      <div className="payment-section">
        <CartTotal />
        <Title text1="PAYMENT" text2="METHOD" />
        <div className="payment-method">
          <div
            className={`payment-method-option ${
              method === "razorpay" ? "active" : ""
            }`}
            onClick={() => setMethod("razorpay")}
          >
            <SiRazorpay />
            <p>Razorpay</p>
          </div>
          <div
            className={`payment-method-option ${
              method === "cod" ? "active" : ""
            }`}
            onClick={() => setMethod("cod")}
          >
            <p>CASH ON DELIVERY</p>
          </div>
        </div>
        <button className="place-order-button" onClick={handlePlaceOrder}>
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export default PlaceOrder;
