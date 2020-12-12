const express = require('express');
const passport = require('passport');
const router = express.Router();
const userController = require('../controller/user_controller');

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register Handle
router.post('/register', userController.create);



// router.post('/register',(req, res) =>{
    
// });


module.exports = router;