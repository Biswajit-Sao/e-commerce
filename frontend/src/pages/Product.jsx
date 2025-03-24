import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { FaRegStar } from "react-icons/fa";
import RelatedProducts from "../components/RelatedProducts";
import "./Product.css"; 

const Product = () => {
  const { productId } = useParams();
  const { products, currency,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState('');

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
  }, [productId]);

  return productData ? (
    <div className="product-container">
      {/* Product Data */}
      <div className="product-details">
        {/* Product Image */}
        <div className="product-image-section">
          <div className="product-thumbnails">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                alt={`Thumbnail ${index + 1}`}
                className={`thumbnail ${image === item ? "active-thumbnail" : ""}`}
              />
            ))}
          </div>
          <div className="product-main-image">
            <img src={image} alt="Main Product" />
          </div>
        </div>
        {/* Product Info */}
        <div className="product-info">
          <h1 className="product-name">{productData.name}</h1>
          <div className="product-rating">
            {[...Array(5)].map((_, index) => (
              <FaRegStar key={index} className="star-icon" />
            ))}
            <p className="rating-count">(1000)</p>
          </div>
          <p className="product-price">{currency}{productData.price}</p>
          <p className="product-description">{productData.description}</p>
          <div className="size-selection">
            <p className="size-label">Select Size</p>
            <div className="size-buttons">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`size-button ${size === item ? "active-size" : ""}`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button onClick={()=>addToCart(productData._id,size)} className="add-to-cart-button">ADD TO CART</button>
          <hr className="divider" />
          <div className="product-policies">
            <p>100% Original product</p>
            <p>Cash on delivery is available on this product</p>
            <p>Easy return and exchange policy in 7 days</p>
          </div>
        </div>
      </div>
      {/* Description and Review Section */}
      <div className="description-review-section">
        <div className="section-header">
          <b>Description</b>
          <p>Reviews (100)</p>
        </div>
        <div className="description-content">
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Suscipit rem non excepturi vitae velit eos vel saepe provident maxime sed. Voluptatem error voluptates inventore rerum ab in velit molestias exercitationem!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati asperiores unde nisi fugiat! Assumenda soluta est quas adipisci reprehenderit excepturi, eveniet laboriosam enim. Distinctio nulla, quaerat est architecto sunt iusto!</p>
        </div>
      </div>
      {/* Display Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : (
    <div className="loading-state opacity-0"></div>
  );
};

export default Product;