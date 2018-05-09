

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, FormGroup, ControlLabel, FormControl } from 'react-router-dom';

import MainView from './views/main-view';
import DetailView from './views/detail-view';
import AddCakeComponent from './views/add-view';

import FetchAllCackes from './services/http-service';
// import App from './App';

// import ListComponent from './components/list';


const NoView = ({ location }) => <div>{location.pathname} : Not found</div>



const root = document.getElementById('root')

ReactDOM.render(

    <Router>
        <Switch>
            <Route exact path="/" component={MainView} />
            <Route path="/detail/:id" component={DetailView} />
            <Route path="/addcake" component={AddCakeComponent} />
            <Route component={NoView} />
        </Switch>
    </Router>
    , root)
