import User from "../models/User.js"
import jwt from 'jsonwebtoken'

export const Login = async (req,res) => {

    let user = await User.findOne({email:req.body.email});
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


}


export const Signup = async (req,res) => {

    let check = await User.findOne({email:req.body.email});
    if (check){
        return res.status(400).json({success:false, error :'existing user with this email'})
    }
    let cart = {};
    for (let i = 0 ; i < 300 ; i++){
        cart[i]=0;
    }
    const user = new User ({
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

}

// middleware bech nlawjou 3al user a partir de la base de donnés ( cas de nizar , yelzem ykoun authentifié bech ynajem ya3ml des actions dans l'applicayion)
export const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }
    try {
        const decoded = jwt.verify(token, 'secret ecomm');
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};


export const addToCart =  async (req, res) => {
    try {
        let userData = await User.findOne({ _id: req.user.id });
        if (!userData) {
            return res.status(404).json({ error: 'User not found' });
        }

        // yelzem el panier ykoun mawjoud fel les propriétés mte3 el user  fel db
        if (!userData.cartData) {
            userData.cartData = {};
        }
        userData.cartData[req.body.itemId] = (userData.cartData[req.body.itemId] || 0) + 1;

        await User.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });

        res.json({ message: 'Added' }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}

export const removeFromCart = async (req, res) => {
    try {
        let userData = await User.findOne({ _id: req.user.id });
        if (!userData) {
            return res.status(404).json({ error: 'User not found' });
        }

        //yelzem el panier ykoun mawjoud fel les propriétés mte3 el user  fel db
        if (!userData.cartData) {
            userData.cartData = {};
        }

        // na9sou fel quantité mte3 lproduit
        if (userData.cartData[req.body.itemId]) {
            userData.cartData[req.body.itemId] -= 1;
            
            // nfas5ou le produit mel panier si la quantité est zéro ou moins
            if (userData.cartData[req.body.itemId] <= 0) {
                delete userData.cartData[req.body.itemId];
            }

            await User.findByIdAndUpdate(req.user.id, { cartData: userData.cartData });
        }

        res.json({ message: 'Removed' }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
}


export const getCart = async (req,res) => {
    console.log('GetCart');
    let userData = await User.findOne({_id:req.user.id})
    res.json(userData.cartData);
}