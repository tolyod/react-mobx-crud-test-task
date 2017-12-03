import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { useStrict } from "mobx";
import CreateMate from './components/CreateMate';
import EditMate from './components/EditMate';
import ListMates from './components/ListMates';
import './index.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

useStrict(true);

const Header = () => (
  <div><Link to='/'>Main List</Link></div>
);

const Main = (props) => {
  return (
    <Switch>
      <Route exact path='/' component={ListMates}/>
      <Route path='/create' component={CreateMate} />
      <Route path='/edit/:mateID' component={EditMate} />
      <Route component={ListMates}/>
    </Switch>
);
};

const App = (props) => {
  return  (
     <div>
       <Header />
       <Main />
     </div>
   );
};

// ========================================

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
