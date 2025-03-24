import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import './ProductItem.css'; 

const Productitem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className="product-item-link">
      <div className="product-item-card">
        <div className="product-item-image-container">
          <img src={image[0]} alt={name} className="product-item-image" />

        </div>
        <p className="product-item-name">{name}</p>
        <p className="product-item-price">
          {currency}
          {price}
        </p>
      </div>
    </Link>
  );
};

export default Productitem;