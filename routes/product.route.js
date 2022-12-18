import express from 'express';
import productModel from '../models/product.model.js';

const router = express.Router();

router.get('/', async function (req, res) {
    const productList = await productModel.findAll();
    res.render('vwAdmin/crud', {
        product: productList
    });
});

router.get('/add', async function (req, res) {
    res.render('vwAdmin/add');
});


router.post('/add', async function (req, res) {
    console.log(req.body);
    const resl = await productModel.addPro(req.body);
    
    res.render('vwAdmin/add');
});

router.post('/del', async function (req, res) {
    const resl = await productModel.delPro(req.body.productID);
    res.redirect('/admin');
});

router.post('/patch', async function (req, res) {
    const resl = await productModel.patch(req.body);
    res.redirect('/admin');
});


export default  router;