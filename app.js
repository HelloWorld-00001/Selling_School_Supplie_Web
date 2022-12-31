import express from 'express';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import { engine } from 'express-handlebars';
import numeral from "numeral";
import session from "express-session";
import hbs_sections from "express-handlebars-sections";

import ProductRoute from "./routes/product.route.js";
import productModel from './models/product.model.js';
import searchRoute from "./routes/search.route.js";
import loginRoute from "./routes/login.route.js";


const app = express();
const PORT = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));


app.engine('hbs', engine({
    defaultLayout:'main.hbs',
    helpers: {           
        section: hbs_sections(),
        formatNumber (val) {
            return String(numeral(val).format('0,0')) + 'đ';
        },
        subString (val) {
            if (val.length > 20)
                return String(val).substring(0, 20) + '...';
            return String(val);
        },

        discountPrice (Price, Discount) {
            return (~~Price * ((100-(~~Discount))/100));
        },
        


    }
}));
app.use(express.urlencoded({
    extended: true
}));

// su dung handlebars
app.set('view engine', 'hbs');
app.set('views', './views');
//ket noi voi folder public de dung css
app.use(express.static(__dirname + '/public'));
app.use('/admin', ProductRoute);
app.use('/search', searchRoute);
app.use('/login', loginRoute);


app.get('/', (req, res) => {
    res.render('home');
});
app.get('/search', (req, res) => {
    res.render('vwProducts/search');
});
app.get('/about', (req, res) => {
    res.render('vwProducts/about');
});

app.get('/cart', (req, res) => {
    res.render('vwProducts/cart');
});
app.get('/checkout', (req, res) => {
    res.render('vwProducts/checkout');
});
app.get('/contact', (req, res) => {
    res.render('vwProducts/contact');
});
app.get('/shop', async (req, res) => {
    const productList = await productModel.findAll();
    res.render('vwProducts/shop',{
        productHome: productList
    });
});
app.get('/login', (req, res) => {
   

    res.render('vwAccount/login' );
});
app.get('/register', (req, res) => {
    res.render('vwAccount/register');
});

app.get('/something', (req, res) => {
    res.render('vwAdmin/add', {
        layout: 'adminLayout.hbs'
    });
});

app.get('/err', (req, res) => {
    res.render('notFound', {layout: false});
});
app.listen(PORT,() => {
    console.log(`Example app listening on port ${PORT}`)
});