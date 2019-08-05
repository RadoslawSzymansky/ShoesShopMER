import React from 'react';
import PropTypes from 'prop-types';
import { Router } from 'react-router-dom';
import '../styles/App.scss';
import history from '../history';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

import 'semantic-ui-css/semantic.min.css';
import { connect } from 'react-redux';
import { loadUser } from '../actions/authActions';
import store from '../store';

import UserNavbar from '../components/UserNavbar';
import Header from '../components/Header';
import Menu from '../components/Menu';
import Content from '../components/Content';

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  static propTypes = {
    auth: PropTypes.object.isRequired
  }

  render() {
    console.log(this.props)
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

const mapStateToPtops = state => {
  return {
  auth: state.auth,
  user: state.user
  }
};

export default connect(mapStateToPtops)(App);
