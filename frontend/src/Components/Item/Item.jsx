import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  return (
    <div className='item'>
      <Link to={`/product/${props._id}`}>
        <img onClick={() => window.scrollTo(0, 0)} src={props.image} alt={props.name} />
      </Link>
      <p>{props.name}</p>
      <div className="item-prices">
        <div className="item-prices-new">
          New Price: {props.new_price} 
        </div>
        <div className="item-prices-old">
          Old Price: {props.old_price} 
        </div>
      </div>
    </div>
  );
}

export default Item;
