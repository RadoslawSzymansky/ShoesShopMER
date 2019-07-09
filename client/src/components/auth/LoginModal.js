import React, { Component } from 'react';
import {
  Button,
  Modal,
  Header,
  Form,
  Message
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class LoginModal extends Component {
  state = {
    modal: false,
    email: '',
    msg: null,
    password: ""
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    const { error } = this.props;
    if (error !== prevProps.error) {
      /// check for register erros
      if (error.id === "LOGIN_FAIL") {
        this.setState({
          msg: error.msg.msg
        });
      } else {
        this.setState({ msg: null });
      };
    };

    if (this.state.modal) {
      if (this.props.isAuthenticated) {
        this.toggle()
      }
    }
  }
  toggle = () => {
    // cleaning errors
    this.props.clearErrors();

    this.setState({ modal: !this.state.modal });
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
    console.log('submit')
    console.log(this.state.msg)
    const {password, email } = this.state;
    const validationErr = this.validator({ password, email });

    if (validationErr.length) {
      this.setState({ msg: validationErr.join(" ") });
      return;
    };
    console.log("po walidacji", password, email)
    
    this.props.login({ password, email })
  }

  validator = formValues => {
    const { password, email } = formValues;
    const validation = [];
    
    if (!password || !email) {
      validation.push('All fields required!')
    }
    return validation;
  }

  render() {
    return (
      <div onClick={this.toggle}>
        <Modal open={this.state.modal} trigger={<Button onClick={this.toggle} primary>Login</Button>} centered={false} 
          onClick={e => e.stopPropagation()}
        >
          <Modal.Header>Login:</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Header>Login to your accout</Header>
              <Form onSubmit={this.onSubmit}>
                <Form.Field onChange={this.onChange}>
                  <label>Email</label>
                  <input type="email" name="email" placeholder='eg. user@gmail.com' />
                </Form.Field>
                <Form.Field onChange={this.onChange}>
                  <label>Password</label>
                  <input type="password" name='password' placeholder='xxxxxx' />
                </Form.Field>
                <Modal.Actions>
                  <Button positive type='submit'>Login</Button>
                  <Button negative onClick={this.toggle}>Cancel</Button>
                </Modal.Actions>
              </Form>
              {this.state.msg ? <Message
                error
                header='Action Forbidden'
                content={this.state.msg}
              /> : null}
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
};


const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
})

export default connect(mapStateToProps, { login, clearErrors })(LoginModal)