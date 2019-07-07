import React, { Component } from 'react';
import {
  Button,
  Modal, 
  Header,
  Form
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    msg: null,
    password: "",
    passwordConfirm: "",
  }

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  }

  componentDidUpdate(prevProps) {
    console.log(this.props, this.state)
    const { error } = this.props;
    if(error !== prevProps.error) {
      /// check for register erros
      if(error.id === "REGISTER_FAIL") {
        this.setState({
          msg: error.msg.msg
        });
      } else {
        this.setState({msg: null});
      };
    };
    
  }
  toggle = () => {
    // cleaning errors
    this.props.clearErrors();

    this.setState({modal: !this.state.modal});
  }  

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = e => {
    e.preventDefault();
    const { name, password, passwordConfirm, email } = this.state;
    const validationErr = this.validator({
      name, password, passwordConfirm, email
    });

    if (validationErr.length) {
      this.setState({msg: validationErr.join(" ")});
      return;
    };
    console.log(name)
    this.props.register({
      name, password, email
    });
    
  }

  validator = formValues => {
    const { name, password, passwordConfirm, email } = formValues;
    const validation = [];
    if (password !== passwordConfirm) {
      validation.push('Passwords are not equal. ')
    }
    if (!name || !password || !passwordConfirm || !email) {
      validation.push('All fields required!')
    }
    return validation;
  }
  
  render() {
    return (
      <div>
        <Modal open={this.state.modal} trigger={<Button onClick={this.toggle}>Register</Button>} centered={false}>
          <Modal.Header>New user:</Modal.Header>
          <Modal.Content image>
            <Modal.Description>
              <Header>Create new account</Header>
              <Form onSubmit={this.onSubmit}>
                <Form.Field onChange={this.onChange}>
                  <label for="name" >Name</label>
                  <input id="name" name="name" placeholder='User Name' />
                </Form.Field>
                <Form.Field onChange={this.onChange}>
                  <label>Email</label>
                  <input type="email" name="email" placeholder='eg. user@gmail.com' />
                </Form.Field>
                <Form.Field onChange={this.onChange}>
                  <label>Password</label>
                  <input type="password" name='password' placeholder='xxxxxx' />
                </Form.Field>
                <Form.Field onChange={this.onChange}>
                  <label>Confirm password</label>
                  <input type="password" name='passwordConfirm' placeholder='xxxxxx' />
                </Form.Field>
                <Button type='submit'>Create account!</Button>
                {this.state.errMsg ? <p></p> : null}
              </Form>
              {this.state.msg? <p>{this.state.msg}</p> : null}
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

export default connect(mapStateToProps, {register, clearErrors})(RegisterModal)