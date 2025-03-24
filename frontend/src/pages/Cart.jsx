import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { ImBin } from 'react-icons/im';
import './Cart.css'; 
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, UpdateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item]
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);


  

  return (
    <div className="cart-container">
      <div>
      <div className="cart-header">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div className="cart-items">
        {cartData.map((item, index) => {
          const ProductData = products.find((product) => product._id === item._id);

          return (
            <div key={index} className="cart-item">
              <div className="cart-item-image">
                <img src={ProductData.image[0]} alt={ProductData.name} />
              </div>
              <div className="cart-item-details">
                <p className="cart-item-name">{ProductData.name}</p>
                <div className="cart-item-info">
                  <p className="cart-item-price">{currency}{ProductData.price}</p>
                  <p className="cart-item-size">{item.size}</p>
                </div>
              </div>
              <input
                className="cart-item-quantity"
                onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : UpdateQuantity(item._id, item.size, Number(e.target.value))}
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <ImBin className="cart-item-delete" onClick={() => UpdateQuantity(item._id, item.size, 0)} />
            </div>
          );
        })}
      </div>
      </div>
      <div>
      <div className="cart-total-section">
        <CartTotal/>
      </div>
      <div className="cart-checkout-button">
        <button onClick={() => navigate('/place-order')}>PROCEED TO CHECKOUT</button>
      </div>
      </div>
    </div>
  );
};

export default Cart;