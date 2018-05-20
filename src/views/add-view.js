import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import { ListGroup, ListGroupItem, Grid, Row, FormGroup, FormControl, ControlLabel, Col, Button, PageHeader } from 'react-bootstrap';

// http services
import http from './../services/http-service';


import AddViewHeader from './../components/add-view-header';

const cakeRateConfig = ['', 1, 2, 3, 4, 5];

export default class AddCakeComponent extends Component {

    constructor(props) {
        super(props);

        // Avoiding the use of Nested Objec.assign() of state
        this.state = {
            name: "",
            comment:  "",
            yumFactor:  "",
            imageUrl:  "",
            ratingOptions: cakeRateConfig,
            isFormSend: false,


            nameError: false,
            commentEror: false,
            yumFactorError: false,
            imageUrlError: false,

            isAllFormEmpty: true
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {

        const { name, value } = event.target;

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
        if (name !== "" && comment !== "" && imageUrl !== "" && yumFactor !== "") {

            http.createCake(cake_config_ob, serverResponse => {

              if(serverResponse.serverMessage === undefined){

                console.log('serverResponse', serverResponse);

                this.setState({
                    name: '',
                    comment: '',
                    yumFactor: '',
                    imageUrl: '',
                }, () => {

                    setTimeout(() => this.setState({
                        isFormSend: true
                    }), 2000)

                });
              }

              else {

                alert('Problem with creating new cake')
              }
            });
        }

        else {

            alert('Sending empty cake info does not make anybody drool')
        }
    }

    render() {

        console.log('add-cake-view', this.state)

        const { ratingOptions,
            name,
            comment,
            yumFactor,
            imageUrl,
            isFormSend,
            nameError,
            commentEror,
            yumFactorError,
            imageUrlError
        } = this.state;

        if (isFormSend === true) {

            return <Redirect to={"/"} />;
        }
        return (
            <Grid>
               <AddViewHeader />
                <Row>
                    <Col xs={12} md={6}>

                        <form onSubmit={this.handleSubmit} action="">
                            <div>
                                <ControlLabel>Name</ControlLabel>
                                <FormControl
                                    placeholder="Enter Name"
                                    type="text"
                                    value={name}
                                    name="name"
                                    onChange={this.handleChange} />
                                {
                                   name.length === 0 ? <p>Name is not defined</p> : null
                                }
                            </div>
                            <div>
                                <ControlLabel>Comment</ControlLabel>
                                <FormControl
                                    componentClass="textarea"
                                    placeholder="textarea"
                                    name="comment"
                                    value={comment}
                                    onChange={this.handleChange} />
                                {
                                    comment.length === 0 ? <p>Comment is not defined</p> : null
                                }
                            </div>
                            <div>
                                <ControlLabel>yumFactor</ControlLabel>
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
                                {
                                    yumFactor === "" ? <p>yumFactor is not defined</p> : null
                                }
                            </div>
                            <div>
                                <ControlLabel>Image url</ControlLabel>
                                <FormControl
                                    placeholder="Enter Name"
                                    name="imageUrl"
                                    type="text"
                                    value={imageUrl}
                                    onChange={this.handleChange} />
                                {
                                    imageUrl.length === 0 ? <p>imageUrl is not defined</p> : null
                                }
                            </div>
                            <hr />
                            <div>
                                <Button type="submit">Send Your cake to make them drool</Button>
                            </div>
                        </form>
                    </Col>
                    <Col xs={12} md={6}></Col>
                </Row>
            </Grid>
        );
    }
}