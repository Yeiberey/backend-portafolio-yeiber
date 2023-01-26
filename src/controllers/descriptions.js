const { Router } = require("express");
const { lang } = require("../../LanguageBack");
const { getDBActivityByPk } = require("../middlewares/getAllActivities");
const {
  getDBDescriptions,
  getDBDescriptionByPk,
  dbCreateDescription,
  dbDeleteDescription,
  dbUpdateDescription,
} = require("../middlewares/getAllDescriptions");
const router = Router();
router.get("/", async (req, res) => {
  try {
    const titles = await getDBDescriptions();
    res.status(200).send(titles);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { language } = req.query;
    const deletedTitle = await getDBDescriptionByPk(req.params.id, language);
    res.status(200).send(deletedTitle);
    return;
  } catch (error) {
    res.status(404).send(error.message);
  }
});
router.post("/", async (req, res) => {
  try {
    const language = req.query.language;
    const createdDescription = await dbCreateDescription(req.body, language);
    res.send(createdDescription);
  } catch ({ message }) {
    res.status(404).send(message);
  }
});
router.put("/bulkupdate", async (req, res) => {
  try {
    const language = req.query.language;
    const promises = req.body.map((description) => {
      return dbUpdateDescription(description, description.id, language);
    });
    await Promise.all(promises);
    res.send(
      `${lang(language, "updated")} ${lang(
        language,
        "successfully"
      ).toLowerCase()}`
    );
  } catch (error) {
    res.status(404).send(error.message);
  }
});
router.put("/:descriptionId", async (req, res) => {
  try {
    const language = req.query.language;
    const updatedDescription = await dbUpdateDescription(
      req.body,
      req.params.descriptionId,
      language
    );
    res.status(200).send(updatedDescription);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
router.delete("/:descriptionId", async (req, res) => {
  try {
    const { language } = req.query;
    const deletedDescription = await dbDeleteDescription(
      req.params.descriptionId,
      language
    );
    res.status(200).send(deletedDescription);
  } catch ({ message }) {
    res.status(404).send(message);
  }
});
module.exports = router;
