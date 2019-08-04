import React from 'react';
import { connect } from 'react-redux';
import Loader from '../components/Loader';

import { fetchProducts } from '../actions/shoesAction';
import ShoeComponent from './ShoeComponent';

class ShoesList extends React.Component {
  componentDidMount() {
    this.props.fetchProducts();
  }

  renderShoes() {
    const {areLoading, isFailed} = this.props.shoes;

    if(!areLoading && !isFailed) {

      return Object.values(this.props.shoes).map(shoe => (
        <ShoeComponent key={shoe._id} {...shoe}/>
      ));

    } else if (areLoading) {

      return <Loader />

    } else if (isFailed) {

      return <p>Sorry, internal server problem</p>;

    };
  } ;

  render() {
    return (
      <div className="ui one cards">
        {this.renderShoes()}
      </div>
    )
  }
};

const mapStateToProps = state => ({
  shoes: state.products
});

export default connect(mapStateToProps, {fetchProducts})(ShoesList);  