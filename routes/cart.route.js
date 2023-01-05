import express from 'express';
import productModel from '../models/product.model.js';

const router = express.Router();


router.get('/', async function (req, res) {
    let cart = [];
    var total = 0;
    const storage = req.session.cart;
    if (storage.length != 0) {
        cart = JSON.parse(storage);
        for (let i = 0; i < cart.length; i++) {
           total = total + ~~(cart[i].product.Price)*~~(cart[i].SL);
        }
    } 
        
    res.render('vwProducts/cart', {
        cart: cart,
        isNull: cart.length === 0,
        total: total
    });
});

router.get('/del', async function (req, res) {
    let cart = [];
    const id = req.query.id;
    const storage = req.session.cart;
    if (storage.length != 0) {
        cart = JSON.parse(storage);
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].product.ProductID == id) {
                cart.splice(i, 1);
                req.session.cart = JSON.stringify(cart);
                break;
            }
         }
    } 
    res.redirect('/cart');
});

router.get('/addToCart', async function (req, res) {
    
    let cart = [];
    let flag = true;
    let storage = req.session.cart;
    const ProID = req.query.id;
    const username = req.query.user;
    // Lay wl tu local storeage
    if (storage.length != 0) {
        cart = JSON.parse(storage); 
    }

    let product = await productModel.findById(ProID);
   
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].product.ProductID == ProID && cart[i].user === username) {
            cart[i].SL = cart[i].SL + 1;
            flag = false;
            break;
        }
    }
    if(flag) {
        cart.push({product, SL:1, user: username});
    }

    console.log(cart);
    req.session.cart = JSON.stringify(cart);


    res.redirect('/shop');
});

router.get('/checkout', async function (req, res) {
    let cart = [];
    var total = 0;
    const storage = req.session.cart;
    if (storage.length != 0) {
        cart = JSON.parse(storage);
        for (let i = 0; i < cart.length; i++) {
           total = total + ~~(cart[i].product.Price)*~~(cart[i].SL);
        }
    } 
        
    res.render('vwProducts/checkout', {
        cart: cart,
        isNull: cart.length === 0,
        total: total
    });
});

export default router;
