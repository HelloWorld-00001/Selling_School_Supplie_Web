import express from 'express';
import {dirname} from 'path';
import {fileURLToPath} from 'url';
import { engine } from 'express-handlebars';
import numeral from "numeral";


import session from "express-session";
import hbs_sections from "express-handlebars-sections";
import fnMySQLStore from "express-mysql-session";


import ProductRoute from "./routes/product.route.js";
import searchRoute from "./routes/search.route.js";
import accountRoute from "./routes/register.route.js";
import cartRoute from "./routes/cart.route.js";
import mainRoute from "./routes/main.route.js";



import { connectionInfo } from "./utils/db.js";

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
        

        calcPrice(price, amount) {
            return (~~price * ~~amount);
        }


    }
}));
app.use(express.urlencoded({
    extended: true
}));

const MySQLStore = fnMySQLStore(session);
const sessionStore = new MySQLStore(connectionInfo);

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    store: sessionStore,
    saveUninitialized: true,
    cookie: {
      // secure: true
    },
  })
);


app.use(async function (req, res, next) {
    if (typeof req.session.auth === "undefined") {
      req.session.auth = false;
    }
    if (typeof req.session.regis === "undefined") {
      req.session.regis = false;
    }
    if (typeof req.session.cart === "undefined") {
      req.session.cart = [];
    }

    res.locals.regis = req.session.regis;
    res.locals.temp = req.session.temp;
    res.locals.auth = req.session.auth;
    res.locals.authUser = req.session.authUser;
    res.locals.cart = req.session.cart;
  
    next();
  });

// su dung handlebars
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/err', function (req, res) {
  throw new Error('Something broke!!!');
})

//ket noi voi folder public de dung css
app.use(express.static(__dirname + '/public'));
app.use('/admin', ProductRoute);
app.use('/search', searchRoute);
app.use('/account', accountRoute);
app.use('/cart', cartRoute);
app.use('/', mainRoute);


app.use(function (req, res, next) {
  res.render('notFound', { layout: false });
});

app.use(function (err, req, res, next) {
  // console.error(err.stack);
  res.status(500).render('500', {
    stack: err.stack,
    layout: false
  });
});


app.listen(PORT,() => {
    console.log(`Example app listening on port ${PORT}`)
});