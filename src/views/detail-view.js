import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { ListGroup, ListGroupItem, Grid, Row, FormGroup, FormControl, ControlLabel, Col, Button, PageHeader } from 'react-bootstrap';

import http from './../services/http-service';


import DetailViewHeader from './../components/detail-view-header'

export default class DetailView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cake: {}
        };
    }

    componentDidMount() {
        // console.log('props', this.props.match.params.id)

        // destructing props object and getting id of cake
        const { match: { params: { id } } } = this.props;
        http.getOneCakeById(id, (singleCake) => {

            if (singleCake.serverMessage === undefined) {
                this.setState(prevState => ({
                    cake: singleCake
                }))
            }
            else {
                alert('Problem to get detail info about cake')
            }
        });
    }

    render() {

        const { cake } = this.state;

        return (
            <Grid>
                <DetailViewHeader />
                <h1>{cake.name}</h1>
                <p>{cake.comment}</p>
                <div>
                    {cake && cake.imageUrl ? <img width="100" height="auto" src={cake.imageUrl} alt={cake.comment} /> : null}
                </div>
            </Grid>
        )
    }

} 