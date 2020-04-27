const express = require("express");
const router = express.Router();
const passport = require("passport");

const Event = require("../models/Event");
const { ensureAuthenticated, forwardAuthenticated } = require("../other/auth");

router.get("/", forwardAuthenticated, (req, res) => {
  res.render("welcome", { title: "HUBX | Welcome to HUBX" });
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    title: "My Dashboard",
    user: req.user,
  });
});

router.get("/createEvent", ensureAuthenticated, async (req, res) => {
  try {
    res.render("createEvent", { title: "Create A Event" });
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/createEvent", ensureAuthenticated, async (req, res) => {
  const { name, location, date, description } = req.body;
  let errors = [];

  if (!name || !location || !date || !description) {
    errors.push({ msg: "Please enter all the fields" });
  }
  if (description.length > 200) {
    errors.push({ msg: "Please write description under 200 characters" });
  }

  if (errors.length > 0) {
    res.render("createEvent", {
      errors,
      name,
      location,
      date,
      description,
      title: "Create an Event",
    });
  } else {
    const newEvent = new Event({
      name,
      location,
      date,
      description,
    });
    newEvent
      .save()
      .then((event) => {
        req.flash("success_msg", "Event created successfully");
        res.redirect("/createEvent");
      })
      .catch((err) => console.log(err));
  }
});

router.get("/events", ensureAuthenticated, async (req, res) => {
  try {
    const events = await Event.find({});
    if (!events) {
      throw new Error("No Event to show.");
    }
    res.render("events", { events, title: "All the Events" });
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = router;
