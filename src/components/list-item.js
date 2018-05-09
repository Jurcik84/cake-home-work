
import React from 'react';
import {Link} from 'react-router-dom';


const ListItemComponent =({item})=> (

    <li>
        <Link to={item}>{item}</Link>
    </li>
)


export default ListItemComponent;