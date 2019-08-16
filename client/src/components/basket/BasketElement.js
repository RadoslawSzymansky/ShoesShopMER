import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchProduct } from '../../actions/shoesAction';
import { removeFromBasket } from '../../actions/userActions';
import shoeIMG from '../../images/shoe.png';

const BaskeElement = props => {

  useEffect(() => {
    props.fetchProduct(props.id)
    // dzieki temu bedzie pobierać elemnty i bd mogli sie z nich odwoływać
  }, []);

  const handleRemove = () => {
    props.removeFromBasket();
  };

  const renderContent = () => {

    if(props.products[props.id]) {
      const {productName, price } = props.products[props.id];
      const { size, count } = props;
      return (
          <div class="item">
            <div class="ui small image">
              <img src={shoeIMG} alt="img" />
            </div>
            <div class="content">
              <p>{productName}</p>
              <div class="meta">
                <span class="price">{price} zł</span>
              </div>
              <div class="description">
                <p>Size <b>{size}</b></p>
                <p>Count <b>{count}</b></p>
              <div>
                <button class="ui inverted red button" onClick={handleRemove}>Remove from basket</button>
              </div>
              </div>
            </div>
          </div>
      )
    } else {
      return 'Loading...'
    }

  }

  return (
    <>
      {renderContent()}
    </>
  );
};

const mapStateToProps = state => ({
  products: state.products
});

const mapDispatchToProps = ( dispatch, ownProps ) => ({
  fetchProduct: () => dispatch(fetchProduct(ownProps.id)),
  removeFromBasket: () => dispatch(removeFromBasket(ownProps.id))
});

export default connect(mapStateToProps, mapDispatchToProps)(BaskeElement);
