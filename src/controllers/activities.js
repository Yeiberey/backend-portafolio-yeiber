const { Router } = require("express");
const {
  getDBActivities,
  getDBActivityByPk,
  dbCreateActivity,
  dbUpdateActivity,
  dbDeleteActivity,
} = require("../middlewares/getAllActivities.js");
const {
  getDBReactions,
  getDBReactionByPk,
} = require("../middlewares/getAllReactions.js");
const { getDBUserByPk } = require("../middlewares/getAllUsers.js");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const activities = await getDBActivities();
    res.status(200).json(activities);
  } catch ({ message }) {
    res.status(404).send(message);
  }
});
router.get("/:activityId", async (req, res) => {
  try {
    const language = req.query.language;
    const activity = await getDBActivityByPk(req.params.activityId, language);
    res.status(200).json(activity);
  } catch ({ message }) {
    res.status(404).send(message);
  }
});

router.post("/", async (req, res) => {
  try {
    const language = req.query.language;
    const user = await getDBUserByPk(req.body.userId);
    const createdActivity = await dbCreateActivity(req.body, user, language);
    res.send(createdActivity);
  } catch ({ message }) {
    res.status(404).send(message);
  }
});
router.put("/:activityId", async (req, res) => {
  try {
    const language = req.query.language;
    const updatedActivity = await dbUpdateActivity(
      req.body,
      req.params.activityId,
      language
    );
    res.send(updatedActivity);
  } catch ({ message }) {
    res.status(404).send(message);
  }
});
router.delete("/:activityId", async (req, res) => {
  try {
    const language = req.query.language;
    const deletedActivity = await dbDeleteActivity(
      req.params.activityId,
      language
    );
    res.status(200).send(deletedActivity);
  } catch ({ message }) {
    res.status(404).send(message);
  }
});

module.exports = router;
