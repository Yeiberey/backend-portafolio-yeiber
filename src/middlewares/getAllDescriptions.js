const { lang } = require("../../LanguageBack.js");
const { Description } = require("../db.js");

const getDBDescriptions = async () => {
  const titles = await Description.findAll();
  return titles;
};
const getDBDescriptionByPk = async (id, language = "en") => {
  const title = await Description.findOne({
    where: {
      id,
    },
  });
  if (!title) {
    throw new Error(
      `${lang(language, "title")} ${lang(language, "notFound").toLowerCase()}`
    );
  }
  return title;
};
const dbCreateDescription = (info, language = "en") => {
  const description = Description.create(info);
  // activity.addDescription(description);
  return description;
  // `${lang(language, "description")} ${lang(
  //   language,
  //   "created"
  // ).toLowerCase()} ${lang(language, "successfully").toLowerCase()}`;
};
const dbUpdateDescription = async (info, id, language = "en") => {
  delete info.id;
  await Description.update(info, { where: { id } });
  return `${lang(language, "description")} ${lang(
    language,
    "updated"
  ).toLowerCase()} ${lang(language, "successfully").toLowerCase()}`;
};

const dbDeleteDescription = async (id, language = "en") => {
  await Description.destroy({ where: { id } });
  return `${lang(language, "description")} ${lang(
    language,
    "deleted"
  ).toLowerCase()} ${lang(language, "successfully").toLowerCase()}`;
};
module.exports = {
  getDBDescriptions,
  getDBDescriptionByPk,
  dbCreateDescription,
  dbDeleteDescription,
  dbUpdateDescription,
};
