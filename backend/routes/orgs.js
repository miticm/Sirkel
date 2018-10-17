const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const config = require("../config/database");
const User = require("../models/user");
const Org = require("../models/org");

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (!req.user) {
      res.json({
        success: false,
        msg: "Must be signed in to create an organization"
      });
    }

    const newOrg = req.body.org;
    newOrg.leader = {};
    newOrg.leader.id = req.user._id;
    newOrg.leader.username = req.user.username;
    newOrg.admins = [];
    newOrg.admins.push(newOrg.leader);
    newOrg.members = [];
    newOrg.members.push(newOrg.leader);
    new Org(newOrg).save((err, org) => {
      if (err) {
        res.json({
          success: false,
          msg: err
        });
      }

      if (org) {
        const newUser = req.user;
        if (!newUser.orgsAdmin) newUser.orgsAdmin = [];
        newUser.orgsAdmin.push({
          id: org._id,
          orgname: org.name
        });

        User.findByIdAndUpdate(req.user._id, newUser, (err, updatedUser) => {
          if (err) {
            res.json({
              success: false,
              msg: err
            });
          }

          if (updatedUser && org) {
            res.json({
              success: true,
              org
            });
          }
        });
      }
    });
  }
);

router.get("/", (req, res, next) => {
  Org.find({}, (err, orgs) => {
    if (err) {
      res.json({
        success: false,
        msg: err
      });
    }

    if (orgs) {
      res.json({
        success: true,
        orgs
      });
    }
  });
});

router.get("/:id", (req, res, next) => {
  Org.findById(req.params.id, (err, org) => {
    if (err) {
      res.json({
        success: false,
        msg: err
      });
    }

    if (!org) {
      res.json({
        success: false,
        msg: "Organization not found."
      });
    } else {
      res.json({
        success: true,
        org
      });
    }
  });
});

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Org.findById(req.params.id, (err, org) => {
      if (org.leader.id === req.user._id) {
        const newOrg = req.body.org;
        Org.findByIdAndUpdate(req.params.id, newOrg, (err, updatedOrg) => {
          if (err) {
            res.json({
              success: false,
              msg: err
            });
          } else {
            res.json({
              success: true,
              org: updatedOrg
            });
          }
        });
      }
    });
  }
);

router.post(
  "/:id/join",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Org.findById(req.params.id, (err, org) => {
      if (err) {
        res.json({
          success: false,
          msg: err
        });
      }
      org.members.push({
        id: req.user._id,
        username: req.user.username
      });

      org
        .save()
        .then(product => {
          res.json({ success: true, product });
        })
        .catch(err => {
          console.log(err);
          res.json({
            success: false,
            msg: err,
            fromSave: true
          });
        });
    });
  }
);

router.delete('/:id', passport.authenticate("jwt", { session: false }), (req, res, next) => {
  console.log("working");
  Ord.findById(req.params.id, (err, org) => {
    if (err) {
      res.json({
        success: false,
        msg: err
      });
    }

    if (!org) {
      res.json({
        success: false,
        msg: "Organization doesn't exist"
      });
    }

    if (org.leader.id.equals(req.user._id)) {
      org.delete();
      res.json({
        success: true,
        msg: "Oranization deleted"
      });
    }
  });
});

module.exports = router;
