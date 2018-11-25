import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';

const Routes = () => (
  <Router>
    <div>
      <NavBar />
      <Route exact path="/" component={Home} />
      <Footer />
    </div>
  </Router>
);

export default Routes;
