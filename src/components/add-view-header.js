import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, PageHeader } from 'react-bootstrap';


const AddViewHeader = () => {
    return (
        <PageHeader>
            <Link to="/">
                <Button>
                    Return to Home Page
                </Button>
            </Link>
        </PageHeader>
    )
}

export default AddViewHeader