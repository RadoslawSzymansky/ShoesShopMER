import { connect } from 'react-redux';

import { fetchBasket } from '../../actions/userActions';

import Basket from './Basket';

const mapStateToProps = state => ({
  basket: state.user.basket,
  isLogin: state.auth.isAuthenticated
});

const mapDispatchToProps = dispatch => ({
  fetchBasket: dispatch(fetchBasket( ))
});

export default connect(mapStateToProps, {fetchBasket})(Basket);