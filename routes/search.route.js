import express from 'express';
import searchModel from '../models/search.model.js';

const router = express.Router();

router.get('/', async function (req, res) {
    res.render('vwProducts/search', {
    });
});

router.post('/', async function (req, res) {
    const name = req.body.Name;
    console.log(name);
    const productList = await searchModel.SearchNormal(name);
    res.render('vwProducts/search', {
        product: productList[0],
        isNull: productList[0].length === 0,
        name: name
    });
});

router.get('/price', async function (req, res) {
    const name = req.query.Name;
    const productList = await searchModel.SearchOrderByPrice(name);
    res.render('vwProducts/search', {
        product: productList[0],
        isNull: productList[0].length === 0,       
        name: name
    });
});

router.get('/rate', async function (req, res) {
    const name = req.query.Name;
    const productList = await searchModel.SearchOrderByRate(name);
    res.render('vwProducts/search', {
        product: productList[0],
        isNull: productList[0].length === 0,
        name: name
    });
});


export default  router;