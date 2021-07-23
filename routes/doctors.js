
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');



// @Route GET api/auth
//@desc Test routr
//@access Public 



const Doctor = require('../models/Doctor');


router.get('/login',(req,res)=>res.render('logind'));

router.get('/register',(req,res)=>res.render('registerd'));

router.get('/dashboardd',(req,res)=>res.render('dashboardd'));

router.get('/_start',(req,res)=>res.render('dashboardd'));






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
      Doctor.findOne({ email: email }).then(doctor => {
        if (doctor) {
          errors.push({ msg: 'Email already exists' });
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          const newDoctor = new Doctor({
            name,
            email,
            password
          });
  
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newDoctor.password, salt, (err, hash) => {
              if (err) throw err;
              newDoctor.password = hash;
              newDoctor
              .save()
              .then(doctor => {
                // req.flash(
                //     'success_msg',
                //     'You are now registered and can log in'
                //   );
                
                res.redirect('/doctors/login');
                
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
      successRedirect: '/dashboardd',
      failureRedirect: '/doctors/login',
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

