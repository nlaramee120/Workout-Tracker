const router = require("express").Router();
const db = require("../models");

router.post("/api/workouts", ({ body }, res) => {
  db.Workout.newWorkout(body)

    .then((data) => {
      res.json(data);
    })

    .catch((err) => {
      res.json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  db.Workout.updateOne(

    { _id: req.params.id },

    {
      $inc: { totalDuration: req.body.duration },
      $push: { exercises: req.body },
    },

    { new: true }

  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .then((data) => {
      data.forEach((workout) => {
        var total = 0;
        workout.exercises.forEach((e) => {
          total += e.duration;
        });
        workout.totalDuration = total;
      });
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  db.Workout.range([{
        $project:
        {
            day: "$day",
            totalDuration: { $sum: "$exercises.duration" },
            totalDistance: { $sum: "$exercises.distance" },
            totalweight: { $sum: "exercises.weight" },
            exercises: "$exercises"
        }
  }])
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});









module.exports = router