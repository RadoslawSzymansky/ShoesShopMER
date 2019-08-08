import React from 'react';
import { connect } from 'react-redux';

import IconButton from './IconButton'

const styles = {
  width: 25,
  height: 25,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#000',
  color: '#ddd',
  position: 'absolute',
  top: '-7px',
  right: '15px',
  borderRadius: 50,
  fontWeight: '700'
};

const BasketIcon = props => {

  return (
    <span style={{position: 'relative'}}>
        <IconButton to="/user/basket" iconName="shopping cart" color="teal" />
        <div style={styles}>{props.productsInBasketCount}</div>
    </span>
  );
};

const mapStateToProps = state => ({
  productsInBasketCount: state.user.basket.length
})

export default connect(mapStateToProps)(BasketIcon);