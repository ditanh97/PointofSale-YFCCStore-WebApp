import React from 'react';
import{BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import Drawer from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import NoPage from './pages/NoPage';

const App = () => {
  return (

    <div>
      {/* <Drawer/> */}

      <Router>
        <Link to="/">Login</Link>
        <Link to="/home">About</Link>
        <Link to="/not-found">Not found</Link>
        <Switch>
        <Route exact path="/" component={Login} />
        {/* <Route exact path="/home" component={Register} /> */}
        <Route path="/home" component={Drawer} />
        <Route component={NoPage}/>
        </Switch>
    </Router>
    </div>
  );
}

export default App;

