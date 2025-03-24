import React from 'react';
import './NewssletterBox.css'; 

const NewssletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
    alert('Thank you for subscribing!'); // Example action on form submission
  };

  return (
    <div className="newsletter-container">
      <div className="newsletter-content">
        <h2 className="newsletter-title">Subscribe now & get 20% off</h2>
        <p className="newsletter-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus exercitationem sed, sint animi ipsam officia commodi tempore. Repudiandae soluta et dicta sunt optio quibusdam inventore, voluptate perspiciatis? Quod, ea minus!
        </p>
        <form className="newsletter-form" onSubmit={onSubmitHandler}>
          <input
            type="email"
            className="newsletter-input"
            placeholder="Enter your email"
            required
          />
          <button type="submit" className="newsletter-button">
            SUBSCRIBE
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewssletterBox;