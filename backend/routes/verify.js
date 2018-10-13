const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const config = require("../config/database");
const vHash = require("../models/vhash");
const User = require("../models/user")
const router = express.Router();


router.post("/:id",(req, res, next) => {
    vHash.getHashbyvHash(req.params.id, (err, hash) => {
        if (err) throw err;
        if (!hash) return res.json({ success: false, msg: "hash not found" });
        User.findById(hash.userID, (err, user) => {
            user.verified = true;
            user.save();
            vHash.findByIdAndDelete(req.params.id, (err,hash) => {
                if (err) throw err;
                console.log(user.username + " verified at " + Date.now());
            });
        });
        return res.json({success: true, msg: hash});
    });
});

module.exports = router;
