import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import http from './../services/http-service';

export default class DetailView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cake: {}
        };
    }

    componentWillMount() {
        // console.log('props', this.props.match.params.id)

        // destructing props object and getting id of cake
        const { match: { params: { id } } } = this.props;
        http.getOneCakeById(id, (singleCake) => {

            this.setState(prevState => ({
                cake: singleCake
            }))
        });
    }

    render() {

        const { cake } = this.state;
        console.log('cake', cake)

        return (
            <div>
                <div>
                    <Link to="/"> Back to main page </Link>
                </div>
                <h1>{cake.name}</h1>
                <p>{cake.comment}</p>
                <div>
                    {cake && cake.imageUrl ? <img width="100" height="auto" src={cake.imageUrl} alt={cake.comment} /> : null}
                </div>
            </div>
        )
    }

} 