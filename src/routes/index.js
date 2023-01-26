const { Router, json } = require("express");
//--------------> Users
const userController = require("../controllers/users");
//--------------> Images
const imageController = require("../controllers/image");
//--------------> Activities
const activitiesController = require("../controllers/activities");
//--------------> Activities
const reactionsController = require("../controllers/reactions");
const descriptionsController = require("../controllers/descriptions");
//<---------------------------------------------------------------------

const router = Router();
router.use(json());
router.use("/users", userController);
router.use("/images", imageController);
router.use("/activities", activitiesController);
router.use("/reactions", reactionsController);
router.use("/descriptions", descriptionsController);

module.exports = router;
