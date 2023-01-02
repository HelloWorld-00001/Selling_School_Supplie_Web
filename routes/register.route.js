import express from 'express';
import bcrypt from 'bcryptjs';
import moment from 'moment';
import randomInteger from 'random-int';

import registerModel from '../models/register.model.js';
import mailer from '../models/mail.model.js';

const router = express.Router();
//Register

router.get('/login', async function (req, res) {
  res.render('vwAccount/login');
});

router.get('/register', async function (req, res) {
  res.render('vwAccount/register');
});

router.post('/register', function (req, res) {
  const rawPassword = req.body.Password;
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(rawPassword, salt);
  const dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
  
  const user = {
    Username: req.body.Username,
    Password: hash,
    Name: req.body.Name,
    DOB: dob,
    Email: req.body.Email,
    isAdmin: false
  }

  const otp = randomInteger(100000, 999999).toString();
  mailer.sendMail(user.Email,otp);



  req.session.regis = true;
  req.session.temp = user;
  req.session.otp = otp;
  res.redirect('/account/sendOTP');
});

router.get('/is-available', async function (req, res) {
  const username = req.query.username;
  const email = req.query.email;

  const checkMailExist = await mailer.isEmailValid(email);
  if(checkMailExist.valid === false)
    return res.json('EmailNotExist');

  var checkUsername = true;
  var checkMail = true;

  const user1 = await registerModel.findByUsername(username);
  if (user1 !== null) 
    checkUsername = false;

  const user2 = await registerModel.findByEmail(email);
  if(user2 !== null)
    checkMail = false;

  if(checkUsername === false && checkMail === false) 
    return res.json('FailTwo');
  if(checkUsername === false)
    return res.json('FailUsername');
  if(checkMail === false)
    return res.json('FailEmail');
  
  res.json(true);
});

//otp
router.get('/sendOTP', regis, async function (req, res) {
  res.render('vwAccount/handleOTP', {layout: false});
});

router.post('/sendOTP', async function (req, res) {
  const newUser = req.session.temp;  
  await registerModel.add(newUser);


  req.session.regis = false;
  req.session.temp = null;

  res.redirect('/account/login');
});

router.get('/is-true-otp', async function (req, res) {
  const otp = req.session.otp;
  const answer = req.query.user;
  if (answer === otp) {
    return res.json(true);
  }

  res.json(false);
});

//login
router.get('/login', async function (req, res) {
  res.render('vwAccount/login', {layout: false});
});

router.post('/login', async function (req, res) {
  const user = await registerModel.findByUsername(req.body.Username);
  if (user === null) {
    return res.render('vwAccount/login', {
      layout: false,
      err_message: 'Invalid username or password.'
    });
  }


  user.DOB = moment(user.DOB, 'YYYY-MM-DD').format('DD/MM/YYYY');
  req.session.auth=true;
  req.session.authUser=user;

  const url = req.session.retUrl || '/';
  res.redirect(url);
});

//logout
router.post('/logout', async function(req, res){
  console.log(req.session.wishList);
  req.session.auth=false;
  req.session.authUser=null;

  const url = req.session.retUrl || '/';
  res.redirect(url);
});

function auth(req, res, next) {
  if(req.session.auth === false) {
    req.session.retUrl = req.originalUrl;
    return res.redirect('/');
  }

  next();
}

function regis(req, res, next) {
  if(req.session.regis === false) {
    req.session.retUrl = req.originalUrl;
    return res.redirect('/');
  }

  next();
}

//profile
router.get('/profile', auth, async function(req, res) {
  res.render('vwAccount/profile');
})

export default router;