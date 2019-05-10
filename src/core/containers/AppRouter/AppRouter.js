import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../../../pages/Home';
import Login from '../../../pages/Login';
import Navbar from '../Navbar';

const AppRouter = () => (
  <Router>
    <Navbar />
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
  </Router>
);

export default AppRouter;
