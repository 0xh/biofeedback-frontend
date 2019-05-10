import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from '../../../pages/Home';
import Login from '../../../pages/Login';
import Navbar from '../Navbar';
import Institution from '../../../pages/Institution';

const AppRouter = () => (
  <Router>
    <Navbar />
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/institution" component={Institution} />
  </Router>
);

export default AppRouter;
