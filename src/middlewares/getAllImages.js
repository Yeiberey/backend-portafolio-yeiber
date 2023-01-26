const { Image } = require("../db.js");

const getAllImage = async (where) => {
  return await Image.findAll({ where });
};

const dbCreateImage = async (info, model) => {
  const image = await Image.create(info);

  model.addImage(image);
  return image;
};
const dbDeleteImage = async (id) => {
  await Image.destroy({
    where: { id },
  });
  return `image id:${id} deleted successfully`;
};
module.exports = {
  getAllImage,
  dbCreateImage,
  dbDeleteImage,
};
