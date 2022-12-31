import express from 'express';
import loginModel from '../models/login.model.js';

const router = express.Router();

router.get('/', async function (req, res) {
    res.render('vwAccount/login', {
    });
});

router.post('/', async function (req, res) {
    const name = req.body.Name;
    console.log(name);
    const accountList = await verifyUser (username, password);
    res.render('vwAccount/login', {
        account: accountList[0],
        isNull: accountList[0].length === 0,
        name: name
    });
});

router.get('/', async function (req, res) {
    const accountList = await loginModel.login(req, res);
    res.render('vwAccount/login', {
        layout: 'home.hbs',
        account: accountList
    });
});


export default  router;