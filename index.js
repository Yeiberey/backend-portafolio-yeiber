const express = require("express");
const server = express();
const { Router } = require("express");
const router = Router();

router.get("/hola", async (req, res) => {
  try {
    res.status(200).json({ hola: "yeiber" });
  } catch (error) {
    res.status(404).send(error.message);
  }
});
server.use(router);
server.listen(3001);
