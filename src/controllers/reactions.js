const { Router } = require("express");
const {
  getDBActivities,
  getDBActivityByPk,
} = require("../middlewares/getAllActivities");
const {
  getDBReactions,
  bdCreateReaction,
  getDBEmojis,
  dbDeleteReaction,
  getDBReactionByPk,
} = require("../middlewares/getAllReactions");
const { Activity, Country } = require("../db.js");
const { getDBUserByPk } = require("../middlewares/getAllUsers");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const { userId, modelName, modelId } = req.query;
    if (userId && modelName && modelId) {
      const response = await getDBReactionByPk(userId, modelName, modelId);
      res.status(200).json(response);
      return;
    }
    const reactions = await getDBReactions();
    res.status(200).json(reactions);
  } catch ({ message }) {
    res.status(404).send(message);
  }
});
router.get("/emojis", async (req, res) => {
  try {
    const reactions = await getDBEmojis();
    res.status(200).json(reactions);
  } catch ({ message }) {
    res.status(404).send(message);
  }
});
router.post("/", async (req, res) => {
  try {
    const { modelName, modelId, userId, code } = req.body;
    const user = await getDBUserByPk(userId);
    let model;
    if (modelName === "activity") {
      model = await getDBActivityByPk(modelId);
    }
    const reactionCreated = await bdCreateReaction(
      code,
      modelName,
      model,
      user,
      req.query.language
    );
    res.status(200).send(reactionCreated);
  } catch ({ message }) {
    res.status(404).send(message);
  }
});

router.delete("/:reactionId", async (req, res) => {
  try {
    const deletedReaction = await dbDeleteReaction(req.params.reactionId);
    res.status(200).send(deletedReaction);
  } catch ({ message }) {
    res.status(404).send(message);
  }
});

module.exports = router;
