import express from 'express';
import productModel from '../models/product.model.js';

const router = express.Router();

router.get('/', async function (req, res) {
    const productList = await productModel.findAll();
    res.render('vwAdmin/crud', {
        layout: 'adminLayout.hbs',
        product: productList
    });
});

router.get('/add', async function (req, res) {
    res.render('vwAdmin/add', {
        layout: 'adminLayout.hbs'
    });
});

router.get('/update', async function (req, res) {
    const x = req.query.id || 0;
    const product = await productModel.findById(x);
    
    res.render('vwAdmin/update', {
        layout: 'adminLayout.hbs',
        product: product
    });
});


router.post('/add', async function (req, res) {
    console.log(req.body);
    const resl = await productModel.addPro(req.body);
    
    res.render('vwAdmin/add', {
        layout: 'adminLayout.hbs'
    });
});

router.post('/del', async function (req, res) {
    const resl = await productModel.delPro(req.body.productID);
    res.redirect('/admin');
});

router.post('/update', async function (req, res) {
    console.log(req.body);
    const resl = await productModel.patchPro(req.body);
    res.redirect('/admin');
});


export default  router;