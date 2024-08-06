import React, { createContext, useEffect } from 'react';

import { useState } from 'react';



export const ShopContext = createContext(null);



const getDefaultCart = () => {
  let cart = {};
  for (let index = 0; index <= 300+1; index++) {
    cart[index] = 0;
  }
  return cart;
};

const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState(getDefaultCart());
  const [allProducts,setAll_Product] = useState([]);


  useEffect(() => {
    fetch('http://localhost:4000/allproducts')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched products:', data);
        setAll_Product(data);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  

  const addToCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    console.log(cartItems);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));

    
  };


  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for(const item in cartItems)
    {
      if (cartItems[item]>0)
      {
        let itemInfo = allProducts.find((product)=> product.id===Number(item))
        totalAmount += itemInfo.new_price * cartItems[item];
      }
      
    }
    return totalAmount;
  };


  const getTotalCartItems = ()=>{
    let totalItem = 0 ;
    for ( const item in cartItems){
      if (cartItems[item]>0)
      {
        totalItem += cartItems[item];
      }
    }

    return totalItem;
  }

  const contextValue = {getTotalCartItems,getTotalCartAmount,allProducts, cartItems, addToCart, removeFromCart };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;



