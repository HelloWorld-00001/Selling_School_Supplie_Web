import express from 'express';
import productModel from '../models/product.model.js';



const router = express.Router();

router.get('/', (req, res) => {
    res.render('home');
});

router.get('/about', (req, res) => {
    res.render('vwProducts/about');
});

router.get('/cart', (req, res) => {
    res.render('vwProducts/cart');
});
router.get('/checkout', (req, res) => {
    res.render('vwProducts/checkout');
});
router.get('/contact', (req, res) => {
    res.render('vwProducts/contact');
});
router.get('/shop', async (req, res) => {
    const productList = await productModel.findAll();
    res.render('vwProducts/shop',{
        productHome: productList
    });
});
router.get('/login', (req, res) => {
   

    res.render('vwAccount/login' );
});
router.get('/register', (req, res) => {
    res.render('vwAccount/register');
});

router.get('/something', (req, res) => {
    res.render('vwAdmin/add', {
        layout: 'adminLayout.hbs'
    });
});
export default router;