const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/createuser", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(422).json({ error: "Please add all the fields" });
  }
  try {
    User.findOne({ email: email }).then((savedUser) => {
      if (savedUser) {
        return res
          .status(422)
          .json({ error: "User already exists with that email" });
      }
      const user = new User({
        email,
        name,
      });
      user
        .save()
        .then((user) => {
          res.json({ message: "saved successfully" });
        })
        .catch((err) => {
          console.log(err);
        });
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/allusers", (req, res) => {
  User.find()
    .then((users) => {
      res.json({ users });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/user/:email", (req, res) => {
  User.findOne({ email: req.params.email })
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/updateuser/:id", (req, res) => {
  //udpate user email
  const { email } = req.body;
  User.findByIdAndUpdate(req.params.id, { email: email }, { new: true })
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/deleteuser/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      res.json({ message: "deleted successfully" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
