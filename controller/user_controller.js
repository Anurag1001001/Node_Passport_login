const Users = require('../models/userSchema');
const fs = require('fs');
const path = require('path');
// this mmodule is basically use to encrpt things 
const bcrypt = require('bcryptjs');
const passport = require('passport');


module.exports.create = function(req, res){
    const {name,email, password, password2} = req.body;
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
    }
    else{
        // Validation passed
        Users.findOne({email: email})
        .then(user => {
            if(user){
                // User exists
                errors.push({msg: 'Email is already registered'});
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                  });
            }else{
              //  method to generate encrypted password
              bcrypt.genSalt(10,(err, salt) =>{
                bcrypt.hash(password, salt, (err, hash) =>{
                  if(err) throw err;
                  console.log(password);
                  req.body.password = hash;
                  Users.create(req.body, (err, user) =>{
                    if (err) throw err;
                    res.redirect('/users/login')
                  })
                })
              })
            }
        })
    }
}