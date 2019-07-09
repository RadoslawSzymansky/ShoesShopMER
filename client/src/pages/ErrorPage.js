import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage =  () => (
  <div>
    <h3>
      Sorry, we couldn't find that site.
      <Link to="/">Go back to main page</Link>
    </h3>
  </div>
);

export default ErrorPage;