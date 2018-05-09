
import React from 'react';
import ListItemComponent from './list-item';




const ListComponent = () => (

    <ul>
    {[1,2,3,4,5].map((item,index)=>   <ListItemComponent item={item}  key={index}/>)}
    </ul>

);

export default ListComponent;