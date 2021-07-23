const { Router } = require('express');
const express = require('express');
const router = express.Router();

// @Route GET api/auth
//@desc Test routr
//@access Public 

router.get('/',(req,res)=>res.send('Booking route'));

module.exports=router;

