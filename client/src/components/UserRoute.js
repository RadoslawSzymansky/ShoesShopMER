import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import UserPanel from '../pages/UserPanel';
import UserBasket from '../pages/UserBasket';
import UserFavorites from '../pages/UserFavorites';


const Content = ({ match }) => {
  return (
    <Switch>
      <Route path={`/user`} exact component={UserPanel} />
      <Route path={`/user/basket`} exact component={UserBasket} />
      <Route path={`/user/favorites`} exact component={UserFavorites} />
      <Route component={ErrorPage}/>
    </Switch>
  );
};

export default Content;