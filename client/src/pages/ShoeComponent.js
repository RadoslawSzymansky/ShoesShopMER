import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchProduct } from '../actions/shoesAction';

import shoe from '../images/shoe.png';
import Star from '../components/FavoriteStar';  
import SizeBox from '../components/SizeBox';
import Loader from '../components/Loader';

const ShoeComponent = props => {
  console.log('render', props)
  if (!props.productName) {
    // when open directly from link.
    if (props.shoes[props.match.params.id]) {
      if (props.shoes[props.match.params.id].isLoading) return <Loader/>; 
      console.log('jestem w pierwszym', props)
      props = props.shoes[props.match.params.id]  
    } else {
      console.log('jestem w else', props)
      props.fetchProduct(props.match.params.id);
      return <Loader/>
    }
  } 
  return(
      <Link to={`/shoes/${props._id}`}   className="card" style={{maxWidth: 280}}>
        <div className="image">
          <img src={shoe} alt="shoe"/>
        </div>
        <div className="extra">
          <h2>{props.productName}</h2>
          <h3>Cena: <span style={{color: "#555"}}>{props.price}</span> {<Star/>}</h3>
        </div>
        <div className="extra">
          <SizeBox  sizes={props.avaibleSizes}/>
          <h5>Products in store <span style={{color: '#555'}}>{props.inStore}</span></h5>
        </div>
        <div className="extra">
          <button className="ui secondary button" style={{width: '100%'}}>
            Buy now!  
          </button>
        </div>
      </Link>
  );
};

const mapStateToProps = state => ({
  shoes: state.products
});

export default connect(mapStateToProps, { fetchProduct })(ShoeComponent);