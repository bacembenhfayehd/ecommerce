import React from 'react';
import './RelatedProducts.css';
import data_product from '../Assets/data' // ce fichier dans le dossier assets contient 4 produits 
import Item from '../Item/Item';

const RelatedProducts = () => {
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {data_product.map((item, i) => { 
          return (
            <Item
              key={i}
              _id={item._id}  
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RelatedProducts;
