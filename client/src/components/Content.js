import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ErrorPage from '../pages/ErrorPage';
import ShoesList from '../pages/ShoesList'
import ShoeComponent from '../pages/ShoeComponent'
import UserRoute from '../components/UserRoute'

const Content = () => {
  return (
    <Switch>
      <Route path='/' exact component={ShoesList} />
      <Route path='/shoes' exact component={ShoesList} />
      <Route path='/shoes/:id' exact component={ShoeComponent} />
      <Route path='/user' component={UserRoute} />
      <Route component={ErrorPage}></Route>
    </Switch>
  );
};

export default Content;