const { Router } = require("express");
const uploadImageController = require("../controllers/uploadImage");
const { getAllImage, dbDeleteImage } = require("../middlewares/getAllImages");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await getAllImage();
    res.status(200).send(products);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedImage = await dbDeleteImage(req.params.id);
    res.status(200).send(deletedImage);
    return;
  } catch (error) {
    res.status(404).send(error.message);
  }
});
router.use("/", uploadImageController);

module.exports = router;
