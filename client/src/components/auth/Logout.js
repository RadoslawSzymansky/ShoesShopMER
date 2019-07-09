import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import { Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class Logout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Button negative onClick={this.props.logout}>Logout</Button>
      </React.Fragment>
    )
  }
  
  static = {
    logout: PropTypes.func.isRequired
  }
};

export default connect(null, { logout })(Logout);