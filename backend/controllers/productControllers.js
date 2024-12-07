import Product from "../models/Product.js"

export const addProduct = async (req,res) => {
    const { name, image, category, new_price, old_price, available } = req.body;

    if (!name || !image || !category || new_price == null || old_price == null || available == null) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (typeof new_price !== 'number' || typeof old_price !== 'number') {
        return res.status(400).json({ error: 'Prices must be numbers' });
    }

    try {
        const product = new Product({
            name,
            image,
            category,
            new_price,
            old_price,
            available
        });

        await product.save();
        console.log('Product saved:', product);

        res.json({
            success: 1,
            name: product.name,
        });
    } catch (error) {
        console.error('Error saving product:', error);
        res.status(500).json({ error: 'An error occurred while saving the product' });
    }

}


export const deleteProduct = async (req,res) => {

    try {
        const result = await Product.findOneAndDelete({ _id: req.body.id });
        if (result) {
            console.log('Removed');
            res.json({
                success: true,
                name: result.name
            });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error removing product:', error);
        res.status(500).json({ error: 'An error occurred while removing the product' });
    }

}


export const PopularWomen = async (req,res) => {

    let popular = await Product.find({category:'women'});
    let popular_women = popular.slice(0,4);
    console.log('popular in women');
    res.send(popular_women);

}


export const newCollections = async (req,res) => {

    const products = await Product.find({});

    let newCollection = products.slice(1).slice(-4);
    console.log('new collection fetched');
    res.send(newCollection);
    
}

export const getAllProducts = async (req,res) => {
    const products = await Product.find({});
    if (products) {
        console.log('All products', products);
        res.json(products);
    } else {
        console.log('Error, check endpoint');
    }
}