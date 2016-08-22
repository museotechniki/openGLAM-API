const passport = require('passport'),
      User = require('../models/users'),
      config = require('./common'),
      JwtStrategy = require('passport-jwt').Strategy,
      LocalAPIKeyStrategy=require('passport-localapikey').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      LocalStrategy = require('passport-local');

// Setting username field to email rather than username
const localOptions = {
  usernameField: 'email'
};

//====================================================//
//                    Local Strategy                  //
//====================================================//

//setting up
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  User.findOne({ email: email }, function(err, user) {
    if(err) { return done(err); }
    if(!user) { return done(null, false, { error: 'Incorrect username. Please try again.' }); }

    user.comparePassword(password, function(err, isMatch) {
      if (err) { return done(err); }
      if (!isMatch) { return done(null, false, { error: "Incorrect password. Please try again." }); }

      return done(null, user);
    });
  });
});


//====================================================//
//                    JWT Strategy                    //
//====================================================//
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),  // checking authorization headers for JWT
  secretOrKey: config.JWTsecret //get JWTsecret from ./config/common.js
};

// Setting up
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload._id, function(err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

//====================================================//
//                    APIkey Strategy                 //
//====================================================//

//setting up
const localapikeyLogin = new LocalAPIKeyStrategy(
  function(apikey, done) {
    User.findOne({ apikey: apikey }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      return done(null, user);
    });
  });


passport.use(localLogin);
passport.use(jwtLogin);
passport.use(localapikeyLogin);
