import React, { useContext } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import drop_down from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";

const ShopCategory = (props) => {
  const { allProducts } = useContext(ShopContext);

  console.log('all_product in ShopCategory:', allProducts);
  console.log('Props category:', props.category);

  if (!allProducts) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(allProducts) || allProducts.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div className="shop-category">
      <img className="shoptcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of {allProducts.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={drop_down} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {allProducts.map((item, i) => {
          const itemCategory = item.category.toLowerCase();
          const propsCategory = props.category.toLowerCase();

          console.log('Item category:', itemCategory, 'Props category:', propsCategory);

          if (propsCategory === itemCategory) {
            return (
              <Item
                key={item._id}
                _id={item._id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
};

export default ShopCategory;
