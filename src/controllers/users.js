const { Router } = require("express");
const {
  getDBUsers,
  getDBUserByPk,
  getUserByName,
  getUserByEmail,
  dbCreateUser,
  dbUpdateUser,
} = require("../middlewares/getAllUsers.js");
//<-------------

const router = Router();

router.get("/", async (req, res) => {
  const { email, name } = req.query;
  try {
    const language = req.query.language;
    if (name) {
      const userByName = await getUserByName(name);
      res.status(200).send(userByName);
      return;
    } else if (email) {
      const userByEmail = await getUserByEmail(email, language);
      res.status(200).send(userByEmail);
      return;
    }
    const users = await getDBUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const language = req.query.language;
    const user = await getDBUserByPk(req.params.id, language);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
router.post("/", async (req, res) => {
  try {
    const language = req.query.language;
    const userCreated = await dbCreateUser(req.body, language);
    res.send(userCreated);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const language = req.query.language;
    const user = await getDBUserByPk(req.params.id);
    const updatedUser = await dbUpdateUser(req.body, user, language);
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
