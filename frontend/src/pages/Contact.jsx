import React from "react";
import "./Contact.css";
import { assest } from "../assets/assest";

const Contact = () => {
  return (
    <div className="contact-container-unique">
      <div className="contact-content-unique">
        <h2 className="contact-title-unique">Contact Us</h2>
        <p className="contact-subtitle-unique">Have questions? Reach out to us anytime!</p>
        <img src={assest.hero} alt="Contact Us" className="contact-image-unique" />
        <div className="contact-info-unique">
          <p><strong>Email:</strong> support@ecourse.com</p>
          <p><strong>Phone:</strong> +1 234 567 890</p>
          <p><strong>Location:</strong> 123 E-Course Street, Tech City</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;