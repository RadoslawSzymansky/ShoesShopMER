import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
import '../styles/App.scss';
import history from '../history';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import 'semantic-ui-css/semantic.min.css';
import { connect } from 'react-redux';
import { loadUser } from '../actions/authActions';
import { fetchBasket, fetchFavorites, connectBaskets } from '../actions/userActions';
import store from '../store';

import UserNavbar from '../components/UserNavbar';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Content from '../components/Content';

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());    
  }

  componentDidUpdate(prevProps, prevState) {
    if ( this.props.auth.isAuthenticated && !this.props.user.basketIsLoading && !this.props.user.basket.length) {
      console.log('App update 1')
      store.dispatch(fetchBasket())
      this.props.fetchFavorites();
    }
    else if (this.props.auth.isAuthenticated !== prevProps.auth.isAuthenticated && prevProps.auth.isAuthenticated === false && !this.props.user.basketIsLoading ) {
      // logowanie i gd jest wiecej niz w kloszyku 1
      console.log('App update 2')
      this.props.fetchFavorites();


      this.props.connectBaskets();
    }
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  } 

  render() {

    return (
      <Router history={history}>
        <div className="app">
          <UserNavbar auth={this.props.auth}/>
          <Header/>
          <Menu/>
          <div className="content" style={{padding: 10}}>
            <Content />
          </div>
        </div>
      </Router>
    )
  }
};

const mapStateToProps = state => {
  return {
  auth: state.auth,
  user: state.user,
  }
};

export default connect(mapStateToProps, {fetchBasket, fetchFavorites, connectBaskets})(App);
