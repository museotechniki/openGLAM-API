
// const jtwController = require('./controllers/jtwController');
// const apikeyController = require('./controllers/apikeyController');
const UsersController = require('./controllers/users');
const ObjectsController = require('./controllers/objects');
const express = require('express');
const passportStrategies = require('./config/passport');
const passport = require('passport');

// Middleware to require specific passport strategy
const requireJwt = passport.authenticate('jwt', { session: false }); //JWT strategy
const requireLogin = passport.authenticate('local', { session: false });//Local login
const requireApikey = passport.authenticate('localapikey', { session: false }); //APIkey strategy

module.exports = function(app) {
  // route groups
  const apiRoutes = express.Router();
  const usersRoutes = express.Router();
  const objectsRoutes = express.Router();


    //=======================================//
  //    User registration & management     //
//=======================================//
  // Set user routes as subgroup/middleware to apiRoutes
  apiRoutes.use('/v1/users', usersRoutes);

// Registration route
  usersRoutes.post('/register', UsersController.register);
// Login route
  usersRoutes.post('/login', requireLogin, UsersController.login);
// Logout route
  usersRoutes.get('/logout', requireJwt, UsersController.logout);

  // to do Password reset & remind

  // View user profile route
usersRoutes.get('/:user_id', requireJwt, UsersController.viewProfile);
//:user_id delete & update
usersRoutes.put('/:user_id', requireJwt, UsersController.updateProfile);
usersRoutes.delete('/:user_id', requireJwt, UsersController.deleteProfile);

//View all users
usersRoutes.get('/', requireJwt, UsersController.manageUsers);
// usersRoutes.get('/', requireApikey, UserController.manageUsers);

//delete all users
usersRoutes.delete('/', requireJwt, UsersController.deleteUsers);


// Test protected route /api/protected requires JTW
//for API key testing change 'requireJwt' with 'requireApikey'
  apiRoutes.get('/protected', requireJwt, function(req, res) {
    res.send({ content: 'The protected test route is functional!'});
  });



    //=========================//
  //     Objects Route       //
//=========================//

apiRoutes.use('/v1/objects', objectsRoutes);
objectsRoutes.get('/', requireJwt, ObjectsController.viewObjects);
objectsRoutes.post('/', requireJwt, ObjectsController.createObjects);
objectsRoutes.put('/:object_id', requireJwt, ObjectsController.updateObjects);
objectsRoutes.delete('/:object_id', requireJwt, ObjectsController.deleteObjects);

              //=========================//
              // Setup Collection Route =//
              //=========================//

// Set url for API group routes
  app.use('/api', apiRoutes);
};
