import React from 'react';
import { connect } from 'react-redux';

import { fetchProducts } from '../actions/shoesAction';
import ShoeComponent from './ShoeComponent';

class ShoesList extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
    console.log('pobranie')
  }

  renderShoes() {
    if(this.props.shoes) {
      return Object.values(this.props.shoes).map(e => (
        <ShoeComponent/>
      ))
    } else return null

    // dac loader a jak nie wczyta to info 
  } 
  render() {
    console.log(this.props)
    return (
      <div>
        {this.renderShoes()}
      </div>
    )
  }
};

const mapStateToProps = state => ({
  shoes: state.products
})

export default connect(mapStateToProps, {fetchProducts})(ShoesList);