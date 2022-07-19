import React from 'react';

const Square = ({ type, headClass }) => {
  return <div className={`square ${type} ${headClass}`}></div>;
};

export default Square;
