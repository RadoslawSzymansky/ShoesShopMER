import React from 'react';
import RegisterModal from '../components/auth/RegisterModal';
import LoginModal from '../components/auth/LoginModal';
import Logout from '../components/auth/Logout';
import { Button, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

const UserNavbar = props => {

    const { isAuthenticated, user } = props.auth;

    const authLink = (
      <div>
        <Link to="/userPanel"><Button primary>{user? `Panel użytkownika ${user.name}` : null}</Button></Link>  
        <Logout />
      </div>
    )

    const guestLink = (
      <div className="">
        <Button.Group>
          <LoginModal />
          <Button.Or/>
          <RegisterModal />
        </Button.Group>
      </div>
    )

    return (
      <>
        <Menu fixed='top' inverted className="user-navbar">
          {isAuthenticated ? authLink : guestLink}
       </Menu>
      </>
    );
};

export default UserNavbar;