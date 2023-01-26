const { Router } = require("express");
const { uploadImage, destroyImage } = require("../utils/cloudinary");
const multer = require("multer");
const fs = require("fs-extra");
const { lang } = require("../../LanguageBack");
const { dbUpdateUser, getDBUserByPk } = require("../middlewares/getAllUsers");
const {
  getDBActivityByPk,
  dbUpdateActivity,
} = require("../middlewares/getAllActivities");
const { dbCreateImage, getAllImage } = require("../middlewares/getAllImages");
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./upload/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().getTime() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post(
  "/upload/multipleimagecloudinary",
  upload.array("file", 10),
  async (req, res) => {
    try {
      let pictureFiles = req.files;
      const { modelName, modelId, language } = req.query;
      let model;
      if (modelName === "activities") {
        model = await getDBActivityByPk(modelId);
      }
      let multiplePicturePromise = pictureFiles.map((file, i) => {
        const { path } = file;
        return uploadImage(
          path,
          req.query.original === "true"
            ? {
                transformation: {
                  width: 1000,
                },
              }
            : {
                transformation: {
                  gravity: "faces",
                  width: 500,
                  height: 500,
                  crop: "fill",
                },
              }
        ).then(async (data) => {
          if (modelName === "activities") {
            const createdImage = await dbCreateImage(
              {
                imageId: data.public_id,
                imageUrl: data.url,
              },
              model
            );
            if (!i) {
              await dbUpdateActivity(
                { imagePrimary: createdImage.id },
                modelId,
                language
              );
            }
          }
          return data;
        });
      });
      let imageResponses = await Promise.all(multiplePicturePromise);
      req.files.map(async (e) => {
        await fs.unlink(`./upload/${e.filename}`);
      });
      const response = {
        urls: imageResponses,
        message:
          lang(language, "bulk") +
          " " +
          lang(language, "uploaded").toLowerCase() +
          " " +
          lang(language, "successfully").toLowerCase(),
      };
      res.send(response);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
);
router.delete("/delete/modelimagescloudinary", async (req, res) => {
  try {
    const { modelName, modelId, language } = req.query;
    let images;
    if (modelName === "activities") {
      images = await getAllImage({ activityId: modelId });
    }
    let promises = [];
    if (images && images.length) {
      promises = images.map((image) => {
        return destroyImage(image.imageId);
      });
    }
    const responsePromises = await Promise.all(promises);
    const response = {
      response: responsePromises,
      message:
        lang(language, "bulk") +
        " " +
        lang(language, "deleted").toLowerCase() +
        " " +
        lang(language, "successfully").toLowerCase(),
    };
    res.send(response);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
router.post(
  "/upload/imagecloudinary",
  upload.single("file"),
  async (req, res) => {
    try {
      const modelName = req.query.modelName;
      const modelId = req.query.modelId;
      const language = req.query.language;
      const data = await uploadImage(
        `./upload/${req.file.filename}`,
        req.query.original === "true"
          ? {}
          : {
              transformation: {
                gravity: "faces",
                width: 500,
                height: 500,
                crop: "fill",
              },
            }
      );

      fs.unlink(`./upload/${req.file.filename}`);
      if (!!req.query.pictureId) {
        await destroyImage(req.query.pictureId);
      }
      if (modelName === "users") {
        const user = await getDBUserByPk(modelId);
        await dbUpdateUser(
          {
            pictureId: data.public_id,
            picture: data.url,
          },
          user
        );
      } else if (modelName === "activities") {
        const activity = await getDBActivityByPk(modelId);
        const createdImage = await dbCreateImage(
          {
            imageId: data.public_id,
            imageUrl: data.url,
          },
          activity
        );
        await dbUpdateActivity(
          { imagePrimary: createdImage.id },
          modelId,
          language
        );
      }
      const response = {
        url: data.url,
        message:
          lang(language, "uploaded") +
          " " +
          lang(language, "successfully").toLowerCase(),
      };
      res.send(response);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
);
router.delete("/delete/imagecloudinary", async (req, res) => {
  try {
    const language = req.query.language;
    await destroyImage(req.query.pictureId);
    const message =
      lang(language, "deleted") +
      " " +
      lang(language, "successfully").toLowerCase();
    res.send(message);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
module.exports = router;
