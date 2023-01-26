const { Reaction, Emoji, Activity } = require("../db.js");

const getDBReactions = async () => {
  const reactions = await Reaction.findAll();
  return reactions;
};
const getDBEmojis = async (modelName, id) => {
  if (id) {
    const emojis = await Emoji.findAll({
      where: { [`${modelName}Id`]: id },
      include: "reactions",
    });
    return emojis;
  }
  return await Emoji.findAll({ include: Reaction });
};
const getDBReactionByPk = async (userId, modelName, modelId) => {
  const reaction = await Emoji.findOne({
    where: {
      [`${modelName}Id`]: modelId,
    },
    include: { model: Reaction, where: { userId } },
  });
  return reaction;
};
const bdCreateReaction = async (
  code,
  modelName,
  model,
  user,
  language = "en"
) => {
  const [emoji, createdEmoji] = await Emoji.findOrCreate({
    where: { code, [`${modelName}Id`]: model.id },
  });
  const [reaction, createdReaction] = await Reaction.findOrCreate({
    where: {
      emojiId: emoji.id,
      userId: user.id,
    },
  });
  await emoji.addReaction(reaction);
  await user.addReaction(reaction);

  return `Reaction created`;
};
const dbDeleteReaction = async (id) => {
  await Reaction.destroy({ where: { id } });
  return `deleted reaction successfully`;
};
module.exports = {
  getDBReactions,
  getDBEmojis,
  getDBReactionByPk,
  bdCreateReaction,
  dbDeleteReaction,
};
