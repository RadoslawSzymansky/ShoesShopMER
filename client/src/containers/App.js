import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import '../styles/App.scss';

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
    return (
      <Router>
        <div className="app">
          <UserNavbar auth={this.props.auth}/>
          <Header/>
          <Menu/>
          <Content/>
        </div>
      </Router>
    )
  }
}

const mapStateToPtops = state => ({
  auth: state.auth
});
export default connect(mapStateToPtops)(App);
