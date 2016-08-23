const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

  //==================//
 // User Schema     //
//================//
const UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  apikey: {
    type:String,
    default:'enakey'
  },
  role: {
    type: String,
    enum: ['Admin', 'Developer'],
    default: 'Developer'
  }
});


//User ORM Methods
// Pre-save of user to database & hash password if password is modified or new
UserSchema.pre('save', function(next) {
  const user = this,
        SALT_FACTOR = 5;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Perform password verification when user tries to sign-in
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) { return cb(err); }
    cb(null, isMatch);
  });
}

module.exports = mongoose.model('User', UserSchema);
