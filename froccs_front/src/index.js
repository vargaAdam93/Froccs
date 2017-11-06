import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import AddUser from './Components/AddUser';
import AddFroccs from './Components/AddFroccs';
import LoginUser from './Components/LoginUser';
import IndexFroccs from './Components/IndexFroccs'
ReactDOM.render(
    <Router>
        <div>
            <Route exact path='/' component={App} />
            <Route path='/add-user' component={AddUser}/>
            <Route path='/login' component={ LoginUser}/>
            <Route path='/add-froccs' component={AddFroccs } />
            <Route path='/froccsok' component={IndexFroccs}/>
        </div>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
