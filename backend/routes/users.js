const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const config = require('../config/database');
const User = require('../models/user');

const router = express.Router();

router.post('/register', (req, res, next) => {
    let newUser = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) res.json({success: false, msg: 'Failed to register user'});
        else res.json({success: true, msg: 'User registered'});
    });
});

router.post('/authenticate', (req, res, next) => {
    const { username, password } = req.body;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({sucess: false, msg: 'user not found'});

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 60 * 60 * 24
                });

                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong Password'});
            }
        });
    });
});

router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});

module.exports = router;