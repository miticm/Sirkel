const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const config = require("../config/database");
const User = require("../models/user");
const Org = require("../models/org");

const router = express.Router();

router.post("/", passport.authenticate("jwt", { session: false }), (req, res, next) => {
    if (!req.user) {
        res.json({
            success: false,
            msg: "Must be signed in to create an organization",
        });
    }

    const newOrg = req.body.org;
    newOrg.leader = req.user;
    new Org(newOrg).save((err, org) => {
        if (err) {
            res.json({
                success: false,
                msg: err,
            });
        }

        if (org) {
            res.json({
                success: true,
                org
            });
        }
    });
});

router.get("/:id", (req, res, next) => {
    Org.findById(req.params.id, (err, org) => {
        if (err) {
            console.log(err);
            res.json({errror: err});
        }
        
        if (!org) {
            res.json({error: 'Organization not found'});
        }
        else {
            res.json(org);
        }
    })
});

module.exports = router;
