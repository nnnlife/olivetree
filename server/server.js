const express = require('express');
const session = require('express-session');
const passport = require('passport');

const next = require('next');
const mongoose = require('mongoose');
const validator = require('validator');

const config = require('./config');
const User = require('./user');
const authSetup = require('./authsetup');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});

const handle = app.getRequestHandler();

mongoose.connect(config.MONGO_URL);
authSetup(passport);


app.prepare().then(() => {
    const server = express();
    
    server.use(require('morgan')('dev'));
    server.use(express.json());
    server.use(express.urlencoded({extended: true}));
    server.use(session({secret: config.SESSION_SECRET}));
    server.use(passport.initialize());
    server.use(passport.session());

    server.get('/', (req, res) => {
        if (req.user) {
            res.redirect('/deck');
        }
        else {
            handle(req, res);
        }
    });

    server.post('/login', passport.authenticate('local', {successRedirect: '/', failureRedirect: '/login'}));
    server.post('/register', (req, res) => {
        if (validator.isEmail(req.body.username) && req.body.password.length > 5) {
            User.findOne({email: req.body.username}, function(err, user) {
                // TODO: when failed how to handle it?
                if (err) res.redirect('/login');
                else if (!user) {
                    let user = new User({
                        email: req.body.username,
                        password: req.body.password,
                    });
                    user.save().then(res.redirect('/login'));
                }
                else {
                    res.redirect('/login');
                }
            });
        }
    });

    server.get('/auth/google', passport.authenticate('google', 
                { scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'] }));

    server.get('/auth/google/callback', 
                passport.authenticate('google', { failureRedirect: '/login' }),
                function(req, res) {
                    console.log('callback');
                    res.redirect('/');
                }
    );

    server.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    server.get('*', (req, res) => {
        return handle(req, res);
    });
    server.listen(8080);
});


