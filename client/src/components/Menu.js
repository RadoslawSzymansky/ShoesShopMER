import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';

const MenuComponent = () => {
  return (
    <Menu className="navigation">
      <Menu.Item name='home'>
        <NavLink to="/" exact={true} className='ui blue basic button'>Home</NavLink>  
      </Menu.Item>
      <Menu.Item name='shoes'>
        <NavLink to="/shoes" exact={true} className='ui blue basic button'>Shoes</NavLink>  
      </Menu.Item>
      <Menu.Item name='user'>
        <NavLink to="/user" exact={true} className='ui blue basic button'>User Panel</NavLink>  
      </Menu.Item>
      <Menu.Item name='contact'>
        <NavLink to="/contact" exact={true} className='ui blue basic button'>Contact</NavLink>
      </Menu.Item>
    </Menu>
  );
};

export default MenuComponent;