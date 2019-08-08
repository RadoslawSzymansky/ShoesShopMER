import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProduct } from '../actions/shoesAction';
import { addProductToBuscet, addToFavorites } from '../actions/userActions';

import shoe from '../images/shoe.png';
import Star from '../components/FavoriteStar';  
import SizeBox from '../components/SizeBox';
import Loader from '../components/Loader';

class ShoeComponent extends React.Component  {
  state = {
    size: "",
    count: 1,
    err: ''
  };

  handleAddProductToBasket = (id) => {
    const {size , count} = this.state;

    if (!size) return this.setState({err: 'Choose size'});
    if (count <= 0) return this.setState({ err: 'Count must be bigger than 0' });

    const productToBasket = {size, count, id};

    this.props.addProductToBuscet(productToBasket);

    this.setState({ err: '' });
  }

  render () {
    let { props } = this;

    if (!props.productName) {
      // when open directly from link.
      if (props.shoes[props.match.params.id]) {
        if (props.shoes[props.match.params.id].isLoading) return <Loader />;
        props = props.shoes[props.match.params.id];
        props.seperated = true;
      } else {
        props.fetchProduct(props.match.params.id);
        return <Loader />
      }
    }


    return (
      <div className={`card ${props.seperated ? 'seperatedCard' : ''}`} style={{ maxWidth: 280 }}>
        <div className="image">
          <Link to={`/shoes/${props._id}`}   >

            <img src={shoe} alt="shoe" style={{ maxWidth: 280 }} />
          </Link>

        </div>
        <div className="extra">
          <h2>{props.productName}</h2>
          <h3>Cena: <span style={{ color: "#555" }}>{props.price}</span> {<Star id={props._id}/>}</h3>
        </div>
        <div className="extra">
          <SizeBox active={this.state.size} chooseSize={(size) => this.setState({size})} sizes={props.avaibleSizes} />
          <h6 style={{color: 'red'}}>{this.state.err}</h6>
          <h5>Products in store <span style={{ color: '#555' }}>{props.inStore}</span></h5>
        </div>
        <div className="extra">
          <div className="countBox">
            <label htmlFor="count">Count:</label><input id='count' type="number" value={this.state.count} onChange={(e) => this.setState({count: Number(e.target.value)})} />  
          </div>
          <button onClick={this.handleAddProductToBasket.bind(null, props._id)} className="ui secondary button" style={{ width: '100%' }}>
            Add to basket
          </button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = state => ({
  shoes: state.products,
});

export default connect(mapStateToProps, { fetchProduct, addProductToBuscet, addToFavorites })(ShoeComponent);