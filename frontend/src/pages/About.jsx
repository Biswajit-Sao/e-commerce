import React from "react";
import { assest } from "../assets/assest";
import './About.css';

const About = () => {
  return (
    <div className="aboutus-container">
      <div className="aboutus-content">
        <h2 className="aboutus-title">About Us</h2>
        <p className="aboutus-text">
          Welcome to <span className="highlight">Tech Innovators</span>! We are a team of dedicated professionals
          passionate about delivering quality and innovation. Our mission is to
          provide the best solutions tailored to our clients' needs.
        </p>
        <p className="aboutus-text">
          With over <span className="highlight">10 years of experience</span> and a commitment to excellence, we strive to
          create impactful digital experiences that make a difference. Our team specializes in
          <span className="highlight">web development</span>, <span className="highlight">mobile apps</span>, and <span className="highlight">AI-driven solutions</span>.
        </p>
        <p className="aboutus-text">
          We believe in <span className="highlight">collaboration</span>, <span className="highlight">creativity</span>, and <span className="highlight">customer satisfaction</span>.
          Let us help you turn your ideas into reality!
        </p>
      </div>
      <div className="aboutus-image">
        <img src={assest.jobbanner} alt="Our Team" className="team-image" />
      </div>
    </div>
  );
};

export default About;