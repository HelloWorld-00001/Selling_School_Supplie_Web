import express from 'express';
import productModel from '../models/product.model.js';

const router = express.Router();


function cartInfo(req) {
    let cart = [];
    let cartFinal = [];
    const user = req.session.authUser.Username;
    var total = 0;
    const storage = req.session.cart;
    if (storage.length != 0) {
        cart = JSON.parse(storage);
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].user === user) {
                total = total + ~~(cart[i].product.Price)*~~(cart[i].SL);
                cartFinal.push(cart[i]);
            }
        }
    } 

    const rel = { cart: cartFinal, total: total, isNull: cartFinal.length === 0}
    return rel;
}



router.get('/', async function (req, res) {
   
    const rel = cartInfo(req);
        
    res.render('vwProducts/cart', {
        cart: rel.cart,
        isNull: rel.isNull,
        total: rel.total
    });
});

router.get('/del', async function (req, res) {
    let cart = [];
    const id = req.query.id;
    const storage = req.session.cart;
    const user = req.session.authUser.Username;

    if (storage.length != 0) {
        cart = JSON.parse(storage);
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].product.ProductID == id && cart[i].user === user) {
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
    const user = req.session.authUser.Username;
    console.log(user);
    // Lay wl tu local storeage
    if (storage.length != 0) {
        cart = JSON.parse(storage); 
    }

    let product = await productModel.findById(ProID);
   
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].product.ProductID == ProID && cart[i].user === user) {
            cart[i].SL = cart[i].SL + 1;
            flag = false;
            break;
        }
    }
    if(flag) {
        cart.push({product, SL:1, user: user});
    }

    req.session.cart = JSON.stringify(cart);


    res.redirect('/shop');
});

router.get('/checkout', async function (req, res) {
    const rel = cartInfo(req);
        
    res.render('vwProducts/checkout', {
        cart: rel.cart,
        isNull: rel.isNull,
        total: rel.total
    });
});

export default router;
