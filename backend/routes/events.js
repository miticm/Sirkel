const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const config = require("../config/database");
const User = require("../models/user");
const Org = require("../models/org");
const Event = require("../models/event");

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    if (!req.user) {
      res.json({
        success: false,
        msg: "Must be signed in to create an event"
      });
    }

    const newEvent = req.body.event;
    newEvent.poster = {};
    newEvent.poster.id = req.user._id;
    newEvent.poster.username = req.user.username;
    newEvent.attendees = [];
    newEvent.attendees.push(newEvent.poster);
    new Event(newEvent).save((err, event) => {
      if (err) {
        res.json({
          success: false,
          msg: err
        });
      }

      if (event) {
        res.json({
          success: true,
          event
        });
      }
    });
  }
);

router.get("/", (req, res, next) => {
  Event.find({}, (err, events) => {
    if (err) {
      res.json({
        success: false,
        msg: err
      });
    }

    if (events) {
      res.json({
        success: true,
        events
      });
    }
  });
});

router.get("/:id", (req, res, next) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) {
      res.json({
        success: false,
        msg: err
      });
    }

    if (!event) {
      res.json({
        success: false,
        msg: "Event not found."
      });
    } else {
      res.json({
        success: true,
        event
      });
    }
  });
});

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Event.findById(req.params.id, (err, event) => {
      if (event.poster.id === req.user._id) {
        const newEvent = req.body.event;
        Event.findByIdAndUpdate(
          req.params.id,
          newEvent,
          (err, updatedEvent) => {
            if (err) {
              res.json({
                success: false,
                msg: err
              });
            } else {
              res.json({
                success: true,
                event: updatedEvent
              });
            }
          }
        );
      }
    });
  }
);

router.post(
  "/:id/attend",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    Event.findById(req.params.id, (err, event) => {
      if (err) {
        res.json({
          success: false,
          msg: err
        });
      }
      event.attendees.push({
        id: req.user._id,
        username: req.user.username
      });
      event.save();

      if (event) {
        res.json({
          success: true
        });
      }
    });
  }
);

router.delete('/:id', passport.authenticate("jwt", { session: false }), (req, res, next) => {

  Event.findById(req.params.id, (err, event) => {
    if (err) {
      res.json({
        success: false,
        msg: err
      });
    }

    if (event.poster.id.equals(req.user._id)) {
      event.deleteOne();
    }
  });
});

module.exports = router;
