import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { ListGroup, ListGroupItem, Grid, Row, PageHeader, Button } from 'react-bootstrap';


import http from './../services/http-service';


export default class MainView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cakes: []
        };
    }
    // This is cousing rerendering and delay
    // componentDidMount(){
    //     this.fetchAllCakes();
    // }



    componentWillMount() {
        http.getAllCakes((cakes) => {
            this.setState((prevState) => ({
                cakes
            }))
        })
    }

    componentDidMount() {

       
    }

    render() {
        const { cakes } = this.state;
        console.log('mainView', cakes);
        return (
            <Grid>
                <PageHeader>
                    <Button>
                        <Link to="/addcake">
                            Add Cake
                        </Link>
                    </Button>
                </PageHeader>
                <ListGroup>
                    {
                        cakes.constructor === Array && cakes.length > 0 ? cakes.map((cake, cakeIndex) => <ListGroupItem key={cake.id}>
                            <Link to={`/detail/${cake.id}`}>
                                <img width="100" src={cake.imageUrl} alt="" />
                                {cake.name}</Link></ListGroupItem>) : 'Sorry No Cakes'
                    }
                </ListGroup>
            </Grid>
        )
    }
}

