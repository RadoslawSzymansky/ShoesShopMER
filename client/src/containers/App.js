import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import RegisterModal from '../components/auth/RegisterModal';

import { loadUser } from '../actions/authActions';
import store from '../store';

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    console.log(RegisterModal)
    return (
      <div>
        App
        <RegisterModal/>
      </div>
    )
  }
}

export default App;
