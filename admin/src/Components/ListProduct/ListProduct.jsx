import React, { useEffect, useState } from 'react'
import cross_icon from '../../assets/cross_icon.png'

import './ListProduct.css'
const ListProduct = () => {

    const [allproducts,setAllProducts] = useState([]);
    const fetchInfo = async ()=> {
        await fetch ('http://localhost:4000/allproducts')
        .then((resp) => resp.json())
        .then((data) => {setAllProducts(data)})
    }

  useEffect(() => {
    fetchInfo();
  },[])


  const removeProduct = async (id) => {
    await fetch ('http://localhost:4000/removeproduct', {
        method :'POST',
        headers:{
            Accept:'application/json' , 'Content-Type' : 'application/json',

        },
        body:JSON.stringify({id:id})
    })

    await fetchInfo();
  }

  return (
    <div className='list-product'>
        <h1>All Products List</h1>
        <div className='listproduct-format-main'>
            <p>Product</p>
            <p>Title</p>
            <p>Old Price</p>
            <p>New Price</p>
            <p>Category</p>
            <p>Remove</p>
        </div>
        <div className='listproduct-allproducts'>
            <hr />
            {allproducts.map((product,index) => {
                return <><div key={index} className='listproduct-format-main listproduct-format'>
                    <img src={product.image} alt="" width={150} className="listproduct-product-icon" />
                    <p className="">{product.name}</p>
                    <p className="">{product.old_price}</p>
                    <p className="">{product.new_price}</p>
                    <p className="">{product.category}</p>
                    <img  onClick={() => removeProduct(product.id)} src={cross_icon} alt="" className="listproduct-product-remove" />

                </div>
                <hr />
                </>
            })}

        </div>
        </div>
  )
}

export default ListProduct