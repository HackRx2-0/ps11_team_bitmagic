
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');



// @Route GET api/auth
//@desc Test routr
//@access Public 



const Patient = require('../models/Patient');


router.get('/login',(req,res)=>res.render('loginp'));

router.get('/register',(req,res)=>res.render('registerp'));

router.get('/dashboardp',(req,res)=>res.render('dashboardp'));



//Register Handle

router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
    let errors = [];
  
    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Please enter all fields' });
    }
  
    if (password != password2) {
      errors.push({ msg: 'Passwords do not match' });
    }
  
    if (password.length < 6) {
      errors.push({ msg: 'Password must be at least 6 characters' });
    }
  
    if (errors.length > 0) {
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2
      });
    } else {
      Patient.findOne({ email: email }).then(patient => {
        if (patient) {
          errors.push({ msg: 'Email already exists' });
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          const newPatient = new Patient({
            name,
            email,
            password
          });
  
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newPatient.password, salt, (err, hash) => {
              if (err) throw err;
              newPatient.password = hash;
              newPatient
              .save()
              .then(patient => {
                // req.flash(
                //     'success_msg',
                //     'You are now registered and can log in'
                //   );
                res.redirect('/patients/login');
                console.log("success logged in ");
              })
              .catch(err => console.log(err));
            });
          });
        }
      });
    }
  });


// Login
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
      successRedirect: '/dashboardp',
      failureRedirect: '/patients/login',
      failureFlash: true
    })(req, res, next);
  });
  
//   // Logout
//   router.get('/logout', (req, res) => {
//     req.logout();
//     // req.flash('success_msg', 'You are logged out');
//     res.redirect('/patients/login');
//   });
  

module.exports=router;

