import express from 'express';
import registerModel from '../models/register.model.js';

const router = express.Router();

router.get('/', async function (req, res) {
    res.render('vwAccount/register', {
    });
});

router.get('/sign up', async function (req, res) {
    console.log(req.body);
    const resl = await registerModel.register(req.body);
    
    res.render('views', {
        layout: 'home.hbs'
    });
});


export default  router;