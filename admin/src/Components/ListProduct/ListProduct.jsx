import React, { useEffect, useState } from 'react'
import cross_icon from '../../assets/cross_icon.png'
import './ListProduct.css'



const ListProduct = () => {
    const [allproducts, setAllProducts] = useState([]);

    const fetchInfo = async () => {
        const resp = await fetch('http://localhost:4000/allproducts');
        const data = await resp.json();
        setAllProducts(data);
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    const removeProduct = async (id) => {
        await fetch('http://localhost:4000/deletePdt', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }) 
        });
    
       
        setAllProducts((prevProducts) => prevProducts.filter(product => product._id !== id));
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
                {allproducts.map((product) => (
                    <React.Fragment key={product._id}>
                        <div className='listproduct-format-main listproduct-format'>
                            <img src={product.image} alt="" width={150} className="listproduct-product-icon" />
                            <p>{product.name}</p>
                            <p>{product.old_price}</p>
                            <p>{product.new_price}</p>
                            <p>{product.category}</p>
                            <img onClick={() => removeProduct(product._id)} src={cross_icon} alt="Remove" className="listproduct-product-remove" />
                        </div>
                        <hr />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default ListProduct;
