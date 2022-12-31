import express from 'express';
import productModel from '../models/product.model.js';

const router = express.Router();


router.get('/', async function (req, res) {
    let cart = [];
    const storage = req.session.cart;
    if (storage) {
        cart = JSON.parse(storage);
    }

    console.log(cart);
    res.render('vwProducts/cart', {
        cart: cart,
        isNull: cart.length === 0
    });
});

router.get('/addToCart', async function (req, res) {
    
    let cart = [];
    let flag = true;
    let storage = req.session.cart;
    const ProID = req.query.id;
    // Lay wl tu local storeage
    if (storage.length != 0) {
        cart = JSON.parse(storage); 
    }

    let product = await productModel.findById(ProID);
   
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].product.ProductID == ProID) {
            cart[i].SL = cart[i].SL + 1;
            flag = false;
            break;
        }
    }
    if(flag) {
        cart.push({product, SL:1});
    }

    req.session.cart = JSON.stringify(cart);


    res.redirect('/shop');
});

export default router;
