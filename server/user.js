const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
    },
    googleId: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    }
});


UserSchema.pre('save', function(next) {
    let user = this;
    if (!user.googleId && user.email && user.password) {
        bcrypt.hash(user.password, 10, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    }
    else {
        next();
    }
});

UserSchema.methods.isValidPassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, same) {
        if (err) return cb(err);
        cb(null, same);
    });
}

module.exports = mongoose.model('User', UserSchema);