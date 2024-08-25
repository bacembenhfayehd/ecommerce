import React, { useState } from 'react'
import upload_area from '../../assets/upload_area.svg'
import './AddProduct.css'

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddProduct = () => {


    const [image , setImage] = useState(null);
    const  [productDetails , setProductDetails] = useState({
        name:'',
        image:'',
        category:'women',
        old_price:'',
        new_price:'',
        available: true,

    })

    const changeHandler = (e) => {

        setImage(e.target.files[0])
    }

    const changeDetails = (e) => {
        setProductDetails({...productDetails , [e.target.name] : e.target.value})

    }

    const addproduct = async () => {

        console.log(productDetails);
        let responseData ;
        let product = productDetails;
         let formData = new FormData();
         product.old_price = Number(product.old_price);
         product.new_price = Number(product.new_price);
         formData.append('product' , image)


         await fetch('http://localhost:4000/upload',{
            method:'POST',
            headers:{
                Accept :'application/json',
            },
            body:formData,

         }).then((resp) => resp.json()).then((data) => {responseData = data})

         if (responseData.success){
            product.image = responseData.image_url
            console.log(product);

            await fetch('http://localhost:4000/addproduct' , {
                method:'POST',
                headers:{
                    Accept:'application/json', 'Content-Type' : 'application/json',
                },
                body:JSON.stringify(product),
             }).then((resp)=> resp.json()).then((data) => {
                if(data.success){
                    toast.success('Product added successfully!');
                }else{
                    toast.error('Failed to add product, please try again.');
                }
             })
         }

        

    }
  return (
    <div className='add-product'>
    <div className='addproduct-itemfiled'>
        <p>Product Title</p>
        <input value={productDetails.name}   onChange={changeDetails} type="text" name='name' placeholder='type here' />
    </div>
    <div className='product-price'>
        <div className='addproduct-itemfiled'>
            <p>Price</p>
            <input value={productDetails.old_price}   onChange={changeDetails} type="text " name='old_price' placeholder='type here' />
        </div>
        <div className='addproduct-itemfiled'>
            <p>Offer Price</p>
            <input value={productDetails.new_price}   onChange={changeDetails}  type="text " name='new_price' placeholder='type here' />
        </div>
    </div>
    <div className='addproduct-itemfiled'>
        <p>Category</p>
        <select value={productDetails.category} onChange={changeDetails} name="category" className='addproduct-selector' id="">
        <option value="Women" className="">Women</option>
        <option value="Men" className="">Men</option>
        <option value="Kid" className="">Kids</option>

        </select>
        
    </div>
    <div className='addproduct-itemfield'>
        <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail'/>
        </label>
        <input type="file"  onChange={changeHandler} name='image' id='file-input'  hidden  />


    </div>
    <button onClick={() => {addproduct()}} className='addproduct-btn'>ADD</button>
    <ToastContainer />
        </div>
  )
}

export default AddProduct