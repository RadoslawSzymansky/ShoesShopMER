import React from 'react';
const starStyles = { position: "absolute", top: 15, right: 15, cursor: 'pointer' }

const FavoriteStar = productId => {
  // <i className="star"/>
  return (
    <i className="star icon outline yellow big favorite" style={starStyles} ></i>
  )
};

export default FavoriteStar;