const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const config = require("../config/database");
const User = require("../models/user");
const Org = require("../models/org");
const rankOrgs = require("../utility/rankOrgs");

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

    newOrg.leader = { id: req.user._id };
    newOrg.leader.username = req.user.username;
    newOrg.admins = [];
    newOrg.admins.push(newOrg.leader);
    newOrg.members = [];
    newOrg.members.push(newOrg.leader);
    newOrg.paidmembers = [];
    newOrg.paidmembers.push(newOrg.leader);

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

            User.find({}).exec((err, allUsers) => {
              if (err) {
                res.json({
                  success: false,
                  msg: err
                });
              }
              // console.log(allUsers);
              const notifyUsers = [];

              allUsers.forEach(unqUser => {
                let userScore = scoreOrg(org, unqUser, []);
                // console.log(userScore);
                if (userScore > unqUser.orgScores[unqUser.orgScores.length - 1]) {
                  for (let i = 0; i < unqUser.orgScores.length; i++) {
                    if (unqUser.orgScores[i] < userScore) {
                      notifyUsers.push(unqUser);
                      unqUser.orgScores.splice(i, 0, userScore);
                      unqUser.orgMatches.splice(i, 0, org);
                      break;
                    }
                  }

                  if (unqUser.orgScores.length > 10) {
                    unqUser.orgScores.pop();
                    unqUser.orgMatches.pop();
                  }
                }
                unqUser.save();
              });
              let userIDs = notifyUsers.map(u => {
                return u._id
              })
              req.io.sockets.emit('match', {users:userIDs});


              res.json({
                success: true,
                org
              });
            });
          }
        });
      }
    });
  }
);

router.get("/all", (req, res, next) => {
  let pageNum = req.params.id;
  Org.find({}).lean().exec((err, orgs) => {
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

router.get(
  "/ranked",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Org.find({})
      .lean()
      .exec((err, orgs) => {
        if (err) {
          res.json({
            success: false,
            msg: err
          });
        }

        if (req.user.orgMatches && req.user.orgMatches.length != 0) {
          // console.log('Here 1');
          User.findById(req.user._id).populate('orgMatches').exec((err, popUser) => {
            if (err) {
              res.json({
                success: false,
                msg: err
              });
            }

            // console.log(popUser.orgScores);

            res.json({
              success: true,
              orgs: popUser.orgMatches
            });
          });
        }
        else if (req.user.survey) {
          const sortedOrgs = rankOrgs(orgs, req.user);
          if (sortedOrgs) {
            req.user.orgMatches = sortedOrgs;

            const sortedRank = [];
            sortedOrgs.forEach(sortedOrg => {
              sortedRank.push(sortedOrg.score);
            });
            req.user.orgScores = sortedRank;

            req.user.save((err, user) => {
              if (err) {
                res.json({
                  success: false,
                  msg: err
                });
              }
              res.json({
                success: true,
                orgs: sortedOrgs
              });
            });
          }
        } else {
          res.json({
            success: false,
            msg: "You have not taken the quiz yet!"
          });
        }
      });
  }
);

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
          res.json({
            success: false,
            msg: err,
            fromSave: true
          });
        });
    });
  }
);

router.post(
  "/:id/dues",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const amount = req.body.amount;
    const userID = req.body.userID;
    Org.findById(req.params.id, (err, org) => {
      if (err) {
        res.json({
          success: false,
          msg: err
        });
      }

      for(let i = 0; i<org.members.length;i++){
        if(org.members[i].id == userID){
          org.members[i].dues = amount;
        }
      }

      org
        .save()
        .then(product => {
          res.json({ success: true, product });
        })
        .catch(err => {
          res.json({
            success: false,
            msg: err,
            fromSave: true
          });
        });
    });
  }
);

router.post(
  "/giveAdmin",
  passport.authenticate("jwt", { session: false }),
  (req,res)=>{
    Org.findById(req.body.orgID,(err,org)=>{
      if (err) {
        res.json({
          success: false,
          msg: err
        });
      }
      let newAdmin = {id:req.body.memberID};
      org.admins.push(newAdmin);
      org
      .save()
      .then(product => {
        res.json({ success: true, product });
      })
    })
  }
)

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
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
  }
);

module.exports = router;
