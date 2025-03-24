import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import Productitem from './Productitem'

const BastSeller = () => {

    const {products}=useContext(ShopContext)
    const [bestSeller,setBestSeller]=useState([])

    useEffect(()=>{
        const bastProduct=products.filter((item)=>(item.bestseller))
        setBestSeller(bastProduct.slice(0,4))
    },[products])

  return (
    <div className="latest-collection-container">
    <div className="latest-collection-header">
      <Title text1="BEST" text2="SELLERS" />
      <p className="latest-collection-description">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illum libero illo provident quas.
      </p>
    </div>

    <div className="latest-collection-grid">
      {bestSeller.map((item, index) => (
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
  )
}

export default BastSeller
