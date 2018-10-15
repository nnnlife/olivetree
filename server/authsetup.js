const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('./user');
const config = require('./config');

module.exports = function(passport) {

    passport.use(new LocalStrategy(
        function(username, password, done) {
            User.findOne({email: username}, function(err, user) {
                if (err) return done(err);
                else if (!user) {
                    return done(null, false, {message: 'incorrect username'});
                }

                user.isValidPassword(password, function(err, same) {
                    if (err) return done(err);
                    else if (!same) {
                        return done(null, false, {message: 'incorrect password'});
                    }
                    else {
                        return done(null, user);
                    }
                });
            });
        }
    ));

    passport.use(new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: config.GOOGLE_CALLBACK_URL
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOne({googleId: profile.id}, function(err, user) {
                if (err) return done(err);
                else if (!user) {
                    User.findOne({email: profile.emails[0].value}, function(err, user) {
                        if (err) return done(err);
                        else if (!user) {
                            let user = new User( {
                                googleId: profile.id,
                                email: profile.emails[0].value
                            });
                            user.save().then(done(null, user));
                        }
                        else {
                            // an user who registered with id/password
                            user.googleId = profile.id;
                            // TODO: notify users about merging
                            user.save().then(done(null, user));
                        }
                    });
                }
                else {
                    done(null, user);
                }
            });


            User.findOne({email: profile.emails[0].value}, function(err, user) {
                if (err) return done(err);
                else if (!user) {
                    let user = new User({
                        googleId: profile.id,
                        email: profile.emails[0].value
                    });
                }
            });
            
            

            console.log(profile);
        }
    ));

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });
}