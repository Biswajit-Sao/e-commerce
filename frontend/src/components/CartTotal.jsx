import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import './CartTotal.css'; // Import the CSS file

const CartTotal = () => {
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
    return (
        <div className="cart-total-container">
            <div className="cart-total-header">
                <Title text1={'CART'} text2={'TOTALS'} />
            </div>
            <div className="cart-total-details">
                <div className="cart-total-subtotal">
                    <p>SUBTOTAL</p>
                    <p>{currency}{getCartAmount()}.00</p>
                </div>
                <hr className="cart-total-divider" />
                <div className="cart-total-shipping">
                    <p>Shipping fee</p>
                    <p>{currency}{delivery_fee}</p>
                </div>
                <hr className="cart-total-divider" />
                <div className="cart-total-total">
                    <b>TOTAL</b>
                    <b>{currency}{getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</b>
                </div>
            </div>
        </div>
    );
};

export default CartTotal;