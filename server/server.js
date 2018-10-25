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

const Branch = require('./branch');

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
            res.redirect('/branch');
        }
        else {
            handle(req, res);
        }
    });

    server.get('/api/branch', (req, res) => {
        if (req.user) {
            Branch.find({user:req.user.id}, function(err, branch) {
                console.log(branch)
                
                res.json(branch)
            });
        }
        else {
            res.send(400)
        }
    });

    server.post('/api/create-branch', (req, res) => {
        console.log(req);
        if (req.user) {
            d = Branch({
                user: req.user.id,
                name: req.body.name 
            });
            d.save().then(() => {
                Branch.find({user:req.user.id}, function(err, branch) {
                    res.json(branch)
                });
            }).catch(() => {
                console.log('create-branch failed')
                res.send(404)
            });
        }
        else {
            res.send(400)
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


