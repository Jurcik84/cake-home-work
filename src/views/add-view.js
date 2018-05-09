import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Image } from 'react-router-dom';

import { ListGroup, ListGroupItem, Grid, Row, FormGroup, FormControl, ControlLabel, Col, Button } from 'react-bootstrap';

// http services
import http from './../services/http-service';

const cakeRateConfig = [1, 2, 3, 4, 5];

export default class AddCakeComponent extends Component {

    constructor(props) {
        super(props);

        // Avoiding the use of Nested Objec.assign() of state
        this.state = {
            name: '',
            comment: '',
            yumFactor: null,
            imageUrl: '',
            ratingOptions: cakeRateConfig

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

        const name = event.target.name;
        const value = event.target.value;

        if (name.constructor === String && value.constructor === String) {

            this.setState({

                [name]: name === 'yumFactor' ? Number(value) : value
            });
        }
        else {
            if (name === undefined || null) alert(JSON.stringify('input is missing name atribute'))
            if (value === undefined || null) alert(JSON.stringify('value not provided'))
        }
    }

    handleSubmit(event) {

        event.preventDefault();

        const id = Math.floor((Math.random() * 1000) + 1);

        const { name, comment, yumFactor, imageUrl } = this.state;

        const cake_config_ob = {
            name,
            comment,
            yumFactor,
            imageUrl,
            id
        };

        // Validation of entered values in form
        if (name.length > 0 && comment.length > 0 && yumFactor !== null && imageUrl.length > 0) {

            http.createCake(cake_config_ob, serverResponse => {

                console.log('serverResponse', serverResponse);

                this.setState({
                    name: '',
                    comment: '',
                    yumFactor: '',
                    imageUrl: '',
                })
            });
        }

        else {

            alert(JSON.stringify(cake_config_ob, null, 5))
        }
    }

    render() {

        const { ratingOptions, name, comment, yumFactor, imageUrl } = this.state;

        console.log(this.state)

        return (
            <Grid>
                <Row>
                    <Col xs={12} md={6}>
                        <div>
                            <Button>
                                <Link to="/" >Back</Link>
                            </Button>
                        </div>
                        <form onSubmit={this.handleSubmit}>
                            <p>
                                <ControlLabel>Name</ControlLabel>
                                <FormControl
                                    placeholder="Enter Name"
                                    type="text"
                                    value={name}
                                    name="name"
                                    onChange={this.handleChange} />
                            </p>
                            <p>
                                <ControlLabel>Comment</ControlLabel>
                                <FormControl
                                    componentClass="textarea"
                                    placeholder="textarea"
                                    name="comment"
                                    value={comment}
                                    onChange={this.handleChange} />
                            </p>
                            <p>
                                <ControlLabel>Rate</ControlLabel>
                                <FormControl componentClass="select" placeholder="select"
                                    name="yumFactor"
                                    value={yumFactor}
                                    onChange={this.handleChange}>
                                    {
                                        ratingOptions
                                            .map((option, optionIndex) =>
                                                <option
                                                    key={optionIndex}
                                                    value={option}>
                                                    {option}
                                                </option>)
                                    }
                                </FormControl>
                            </p>
                            <p>
                                <ControlLabel>Image url</ControlLabel>
                                <FormControl
                                    placeholder="Enter Name"
                                    name="imageUrl"
                                    type="text"
                                    value={imageUrl}
                                    onChange={this.handleChange} />
                            </p>
                            <p>
                                <FormControl type="submit" value="Submit" />
                            </p>
                        </form>
                    </Col>
                    <Col xs={12} md={6}></Col>
                </Row>
            </Grid>
        );
    }
}