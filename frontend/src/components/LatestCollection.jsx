import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import Productitem from './Productitem';
import './LatestCollection.css'; 

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="latest-collection-container">
      <div className="latest-collection-header">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="latest-collection-description">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum libero illo provident quas.
        </p>
      </div>

      <div className="latest-collection-grid">
        {latestProducts.map((item, index) => (
          <Productitem
            key={index}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;