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

        if(localStorage.getItem('auth-token')){
          fetch('http://localhost:4000/getcartData',{
            method:'POST',
            headers:{
              Accept:'application/json',
               'auth-token' :`${localStorage.getItem('auth-token')}` ,
               'Content-Type':'application/json'

            },

            body:'',
          }).then((response) => response.json()).then((data) => setCartItems(data))
        
        }
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  

  const addToCart = (itemId) => {
   
    setCartItems((prev) => ({
        ...prev,
        [itemId]: (prev[itemId] || 0) + 1 
    }));

    // nchoufou el user authentifié welee leee
    const token = localStorage.getItem('auth-token');
    if (token) {
        fetch('http://localhost:4000/addCart', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'auth-token': token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'itemId': itemId }) 
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => console.log(data))
        .catch((error) => console.error('There was a problem with your fetch operation:', error));
    } else {
        console.error('No auth-token found in localStorage');
    }
};

  

const removeFromCart = (itemId) => {
  setCartItems((prev) => {
      const newCartItems = { ...prev };
      if (newCartItems[itemId] > 0) {
          newCartItems[itemId] -= 1;
      }
      return newCartItems;
  });

  const token = localStorage.getItem('auth-token');
  if (token) {
      fetch('http://localhost:4000/removeCart', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'auth-token': token,
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 'itemId': itemId })
      })
      .then((response) => {
          if (!response.ok) {
              return response.text().then(text => {
                  throw new Error(`Network response was not ok: ${text}`);
              });
          }
          return response.json();
      })
      .then((data) => console.log(data))
      .catch((error) => console.error('There was a problem with your fetch operation:', error));
  } else {
      console.error('No auth-token found in localStorage');
  }
};



  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        let itemInfo = allProducts.find((product) => product._id === itemId);
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItems[itemId];
        } else {
          console.warn(`Product with id ${itemId} not found in allProducts.`);
        }
      }
    }
    return totalAmount;
  };

  


  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        totalItem += cartItems[itemId];
      }
    }
    return totalItem;
  };

  const contextValue = {getTotalCartItems,getTotalCartAmount,allProducts, cartItems, addToCart, removeFromCart };
  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;



