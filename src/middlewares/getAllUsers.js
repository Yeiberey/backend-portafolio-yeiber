const { QueryTypes, Sequelize, where, Op } = require("sequelize");
const { lang } = require("../../LanguageBack.js");
const { User, conn } = require("../db.js");

const OBJUsers = [
  {
    id: 1,
    name: "yeiber",
    email: "yeiberey@gmail.com",
    user: "yeiberey",
    password: "123456",
    phone: "57-320-3301329",
  },
];

const getDBUsers = async () => {
  let users = await User.findAll();
  // while (!users.length) {
  //   users = await User.findAll();
  //   if (!users.length) {
  //     await User.bulkCreate(OBJUsers, { validate: true });
  //   }
  // }
  return users;
};
const getDBUserByPk = async (id, language = "en") => {
  const user = await User.findOne({
    where: { id },
  });
  if (!user) {
    throw new Error(
      `${lang(language, "user")} ${lang(language, "notFound").toLowerCase()}`
    );
  }
  return user;
};
const getUserByName = async (name) => {
  const users = await User.findAll({
    where: {
      name: {
        [Op.iLike]: `%${name}%`,
      },
    },
  });
  return users;
};
const getUserByEmail = async (email, language = "en") => {
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error(
      `${lang(language, "user")} ${lang(language, "notFound").toLowerCase()}`
    );
  }
  return user;
};
const dbCreateUser = async (info, language = "en") => {
  await User.create(info);
  return `${lang(language, "user")} ${lang(
    language,
    "created"
  ).toLowerCase()} ${lang(language, "successfully").toLowerCase()}`;
};
const dbUpdateUser = async (info, modelUser, language = "en") => {
  delete info.id;
  delete info.autByGoogle;
  for (const property in info) {
    modelUser[property] = info[property];
  }
  modelUser.save();
  return `${lang(language, "user")} ${
    info.name ? info.name : info.username
  } ${lang(language, "updated").toLowerCase()} ${lang(
    language,
    "successfully"
  ).toLowerCase()}`;
};
module.exports = {
  getDBUsers,
  getDBUserByPk,
  getUserByName,
  getUserByEmail,
  dbCreateUser,
  dbUpdateUser,
};
