import React, { useEffect, useState } from 'react';
import './Popular.css';
import Item from '../Item/Item';

const Popular = () => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/popularWomen')
      .then((response) => response.json())
      .then((data) => setPopular(data));
  }, []);

  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular-item">
        {popular.map((item, i) => (
          <Item
            key={i}
            _id={item._id}  // kima fel cas mte3 newcollection
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
    </div>
  );
};

export default Popular;
