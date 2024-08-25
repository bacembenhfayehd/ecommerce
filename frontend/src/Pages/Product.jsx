import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

const Product = () => {
  const { allProducts } = useContext(ShopContext);
  const { productId } = useParams();

  useEffect(() => {
    console.log('productId from params:', productId);
    console.log('allProducts:', allProducts);

  
    allProducts.forEach((product, index) => {
      console.log(`Product ${index} ID: ${product._id} - Full Product:`, product);
    });
  }, [productId, allProducts]);

  if (!productId || !allProducts) {
    return <div>Loading...</div>;
  }

  const product = allProducts.find((e) => String(e._id) === String(productId));

  if (!product) {
    console.error(`Product not found for ID: ${productId}`);
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Product;
