import React from 'react';
import './Title.css'; // Import the CSS file

const Title = ({ text1, text2 }) => {
  return (
    <div className="title-container">
      <p className="title-text">
        {text1}
        <span className="title-highlight">{text2}</span>
      </p>
    </div>
  );
};

export default Title;