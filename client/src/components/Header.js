import React from 'react';
import bootsImg from '../images/boots.jpg';
import BasketIcon from './BasketIcon';
import FavoriteMainIcon from './FavoriteMainIcon'

const UserNavbar = props => {

  return (
    <div className="header" style={{backgroundImage: `url(${bootsImg})`}}>
      <BasketIcon />
      <FavoriteMainIcon />
    </div>
  );
};

export default UserNavbar;