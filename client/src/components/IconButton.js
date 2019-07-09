import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

const UserNavbar = props => {

  return (
    <Link to={props.to}>
      <Icon name={props.iconName} size="huge" color={props.color}/>
    </Link>
  );
};

UserNavbar.propTypes = {
to: PropTypes.string.isRequired,
iconName: PropTypes.string.isRequired,
color: PropTypes.string.isRequired
};

export default UserNavbar;