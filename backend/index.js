const PORT = 4000; 
const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect('mongodb+srv://bacem:GOMYCODE2024@cluster0.bumvmfi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Database is connected'))
  .catch(err => console.log('Database connection error:', err));

app.get('/', (req, res) => {
    res.send('Express app is running');
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'upload/images'));
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

app.use('/images', express.static(path.join(__dirname, 'upload/images')));

app.post('/upload', upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`
    });
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        required: false,
    }
});

const Product = mongoose.model('Product', productSchema);

app.post('/addproduct', async (req, res) => {
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
});

app.post('/removeproduct', async (req, res) => {
    try {
        const result = await Product.findOneAndDelete({ id: req.body.id });
        if (result) {
            console.log('Removed');
            res.json({
                success: true,
                name: req.body.name
            });
        } else {
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error removing product:', error);
        res.status(500).json({ error: 'An error occurred while removing the product' });
    }
});

app.get('/allproducts', async (req, res) => {
    const products = await Product.find({});
    if (products) {
        console.log('All products', products);
        res.json(products);
    } else {
        console.log('Error, check endpoint');
    }
});


const Users = mongoose.model('User' , {
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,

    },

    cartData:{
        type:Object,
    },

    date:{
        type:Date,
        default:Date.now,

    }
})

app.post('/signup' , async (req,res) => {
    let check = await Users.findOne({email:req.body.email});
    if (check){
        return res.status(400).json({success:false, error :'existing user with this email'})
    }
    let cart = {};
    for (i = 0 ; i < 300 ; i++){
        cart[i]=0;
    }
    const user = new Users ({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        cartData:cart
    })
    await user.save();
    const data = {
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data,'secret ecomm');
    res.json({success:true,token})
})

app.post('/login', async (req,res) => {
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const comparePass = req.body.password === user.password ;
        if (comparePass){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret ecomm');
            res.json({success:true,token})

        }else{
            res.json({success:false,error:'wrong password'})
        }
    } else {
        res.json({success:false, error:'wrong email id '})
    }
})

app.listen(PORT, (error) => {
    if (!error) {
        console.log('Server running on port ' + PORT);
    } else {
        console.log('Error:', error);
    }
});
