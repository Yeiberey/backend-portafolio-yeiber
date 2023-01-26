const { QueryTypes, Sequelize } = require("sequelize");
const { lang } = require("../../LanguageBack.js");
const {
  Activity,
  Reaction,
  Emoji,
  Description,
  ActivitiesReaction,
  conn,
  Op,
} = require("../db.js");
const { getDBEmojis } = require("./getAllReactions.js");

const getDBActivities = async () => {
  const activities = await Activity.findAll({
    include: [
      { model: Description, order: [["descriptions.position", "ASC"]] },
      "images",
      "user",
      {
        model: Emoji,
        include: { model: Reaction, include: "user" },
      },
    ],

    order: [
      ["id", "DESC"],
      [Description, "position", "ASC"],
      [Emoji, "id", "ASC"],
    ],
  });

  return activities;
};

const getDBActivityByPk = async (id, language = "en") => {
  const activity = await Activity.findOne({
    where: {
      id,
    },
    include: [
      "descriptions",
      "images",
      "comments",
      "user",
      {
        model: Emoji,
        include: { model: Reaction, include: "user" },
      },
    ],
    order: [
      [Description, "position", "ASC"],
      [Emoji, "id", "ASC"],
    ],
  });
  if (!activity) {
    throw new Error(
      `${lang(language, "activity")} ${lang(
        language,
        "notFound"
      ).toLowerCase()}`
    );
  }
  return activity;
};
const dbCreateActivity = async (info, modelUser, language = "en") => {
  const activity = await Activity.create({ ...info });
  const emojis = await Emoji.bulkCreate([
    {
      code: ":smile:",
    },
    {
      code: ":heart:",
    },
  ]);
  console.log(info.descriptions);
  const descriptions = await Description.bulkCreate(info.descriptions);
  await activity.addEmojis(emojis);
  await activity.addDescriptions(descriptions);
  await modelUser.addActivity(activity);
  return [
    activity,
    `${lang(language, "activity")} ${lang(
      language,
      "created"
    ).toLowerCase()} ${lang(language, "successfully").toLowerCase()}`,
  ];
};
const dbDeleteActivity = async (id, language = "en") => {
  await Activity.destroy({ where: { id } });
  return `${lang(language, "activity")} ${lang(
    language,
    "deleted"
  ).toLowerCase()} ${lang(language, "successfully").toLowerCase()}`;
};
const dbUpdateActivity = async (info, id, language = "en") => {
  delete info.id;
  await Activity.update(info, { where: { id } });
  return `${lang(language, "activity")} ${lang(
    language,
    "updated"
  ).toLowerCase()} ${lang(language, "successfully").toLowerCase()}`;
};

module.exports = {
  getDBActivities,
  getDBActivityByPk,
  dbCreateActivity,
  dbDeleteActivity,
  dbUpdateActivity,
};
