"use strict";

const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/users');
const config = require('../config/common');

// Generate JWT
function generateToken(user) {
  return jwt.sign(user, config.secret, {
    expiresIn: 10080 // in seconds
  });
}

// Set user info from request
function setUserInfo(request) {
  let getUserInfo = {
    _id: request._id,
    firstName: request.profile.firstName,
    lastName: request.profile.lastName,
    email: request.email,
    role: request.role
  };

  return getUserInfo;
}

//========================================
// Login Route
//========================================

exports.login = function(req, res, next) {

  var userInfo = setUserInfo(req.user);

  res.status(200).json({
    token: 'JWT ' + generateToken(userInfo),
    user: userInfo
  });
}


// Logout Route
//========================================
exports.logout = function(req, res, next) {

  req.logout();

  res.status(200).json({
    message:'Bye!'
  });
}

//========================================
// Registration Route
//========================================
exports.register = function(req, res, next) {
  // Check for registration errors
  var email = req.body.email;
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var password = req.body.password;

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.'});
  }

  // Return error if full name not provided
  if (!firstName || !lastName) {
    return res.status(422).send({ error: 'You must enter your full name.'});
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }

  User.findOne({ email: email }, function(err, existingUser) {
      if (err) { return next(err); }

      // If user is not unique, return error
      if (existingUser) {
        return res.status(422).send({ error: 'That email address is already in use.' });
      }

      // If email is unique and password was provided, create account
      let user = new User({
        email: email,
        password: password,
        profile: { firstName: firstName, lastName: lastName }
      });

      user.save(function(err, user) {
        if (err) { return next(err); }

//generate an APIkey and save it to user


        // Respond with JWT if user was created
        let userInfo = setUserInfo(user);//I may have to change this in order to be used at the message.

        //here I should respond with a "wait approval" message if user_id has not been approaved
        res.status(201).json({
          message: 'thanks you for registering! Your account is waiting for aproval.',
          //  token: 'JWT ' + generateToken(userInfo),
          user: userInfo //no need to send the password back
        });
      });
  });
}

//=========================
// Profile management by user/developer
//=============
exports.viewProfile = function(req, res, next) {
  if (!req.user._id == req.params.user_id) { return res.status(401).json({ error: 'You are not authorized to view this user profile.'}); }
    User.findById(req.params.user_id, function(err, user) {
      if (err) {
        res.status(400).json({ error: 'No user could be found for this ID.' });
        return next(err);
      }

     var userProfile = { _id: user._id,
                        firstName: user.profile.firstName,
                        lastName: user.profile.lastName,
                        email: user.email,
                        role: user.role};

      res.status(200).json({userProfile});
      next();
    });
}

//update user profile -- It only updates if all fields are completed
exports.updateProfile = function(req, res, next){
  // if (!req.user._id == req.params.user_id) { return res.status(401).json({ error: 'You are not authorized to edit this user profile.'}); }
  User.findById(req.params.user_id, function(err, user){
    // var userProfile = user;
              user.profile.firstName = req.body.firstName;
              user.profile.lastName = req.body.lastName;
              user.email= req.body.email;

              user.save(function(err, user){
                if(err)
                  return next(err);
              res.status(200).json({message : user});
                next();
                });
              });
            }

// delete a profile
exports.deleteProfile = function(req, res, next){
  if (!req.user._id == req.params.user_id) { return res.status(401).json({ error: 'You are not authorized to delete this user profile.'}); }
  User.remove({_id:req.params.user_id}, function(err){
    if (err) {
      //it needs more a better work with the errors and the status reports, but it works
      res.status(400).json({error:'No user could be found for this ID.'});
      return next (err);
    }
    res.status(204).json({ message: 'The user has been deleted successfully.'});
  next();
  })
}

//=========================
// User management by Admin
//=============

//view all users
exports.manageUsers = function (req, res, next){
  User.find({}, function(err, user){
    res.json(user);
  });
}

//delete all users
exports.deleteUsers = function (req, res, next){
  User.remove({}, function (err){
    res.json({result: err ? 'error' : 'ok'});
  });
}
