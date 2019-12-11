import React from 'react';
import{BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';

import {Provider} from 'react-redux';
import Store from './services/redux/Store';
import Drawer from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NoPage from './pages/NoPage';

const App = () => {
  return (
    <Provider store={Store}>
    <div>
      <Router>
        <Link to="/">Login</Link>
        <Link to="/home">About</Link>
        <Link to="/register">Register</Link>
        <Link to="/not-found">Not found</Link>
        <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route path="/home" component={Drawer} />
        <Route component={NoPage}/>
        </Switch>
    </Router>
    </div>
    </Provider>
  );
}

export default App;

