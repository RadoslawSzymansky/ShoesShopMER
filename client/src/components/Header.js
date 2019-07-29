import React from 'react';
import IconButton from './IconButton'
import bootsImg from '../images/boots.jpg'
const UserNavbar = props => {

  return (
    <div className="header" style={{backgroundImage: `url(${bootsImg})`}}>
      <IconButton to="/user/basket" iconName="shopping cart" color="teal"/>
      <IconButton to="/user/favorites" iconName="star" color="yellow"/>
    </div>
  );
};

export default UserNavbar;