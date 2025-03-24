import React from "react";
import { BiSupport } from "react-icons/bi";
import { GiCardExchange } from "react-icons/gi";
import { TbTruckReturn } from "react-icons/tb";
import "./OurPolicy.css";

const OurPolicy = () => {
  return (
    <div className="policy-container">
      <div className="policy-card">
        <div className="policy-icon">
          <GiCardExchange />
        </div>
        <h3 className="policy-title">Easy Exchange Policy</h3>
        <p className="policy-description">We offer a hassle-free exchange policy.</p>
      </div>
      <div className="policy-card">
        <div className="policy-icon">
          <TbTruckReturn />
        </div>
        <h3 className="policy-title">7 Days Return Policy</h3>
        <p className="policy-description">We provide a 7-day free return policy.</p>
      </div>
      <div className="policy-card">
        <div className="policy-icon">
          <BiSupport />
        </div>
        <h3 className="policy-title">Best Customer Support</h3>
        <p className="policy-description">We provide 24/7 customer support.</p>
      </div>
    </div>
  );
};

export default OurPolicy;