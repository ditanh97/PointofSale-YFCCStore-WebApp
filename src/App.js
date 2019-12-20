import React from 'react';
import{BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {Provider} from 'react-redux';
import Store from './services/redux/Store';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NoPage from './pages/NoPage';
import Authentication from './pages/Authentication'
import Toast from './components/Toast'

const App = () => {
  return (
    <Provider store={Store}>
    <Toast/>
    <div>
      <Router>
        <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Authentication>
          <Route path="/home" component={Home} />
        </Authentication>
        <Route component={NoPage}/>
        </Switch>
    </Router>
    </div>
    </Provider>
  );
}

export default App;

