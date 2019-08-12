import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../../actions/shoesAction';

const BaskeElement = props => {

  useEffect(() => {
    props.fetchProduct(props.id)
    // dzieki temu bedzie pobierać elemnty i bd mogli sie z nich odwoływać
  }, []);

  const renderContent = () => {

    if(props.products[props.id]) {
      const {productName} = props.products[props.id]
      return (
        <>
          <li>{productName} {props.size}  {props.count}</li>
        </>
      )
    } else {
      return 'Loading...'
    }

  }

  return (
    <>
      <div class="ui olive segment">{renderContent()}</div>
    </>
  );
};

const mapStateToProps = state => ({
  products: state.products
});

const mapDispatchToProps = ( dispatch, ownProps ) => ({
  fetchProduct: () => dispatch(fetchProduct(ownProps.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(BaskeElement);
