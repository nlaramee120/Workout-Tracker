const router = require("express").Router();
const db = require("../models");

router.post("/api/workouts", ({ body }, res) => {
  db.Workout.create(body)

    .then((data) => {
      res.json(data);
    })

    .catch((err) => {
      res.json(err);
    });
});









module.exports = router