

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import MainView from './views/main-view';
import DetailView from './views/detail-view';
import AddCakeComponent from './views/add-view';

import NoView from './views/no-view';




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
