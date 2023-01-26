const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define(
    "user",
    {
      // id: {
      //   type: DataTypes.NUMERIC,
      //   allowNull: false,
      //   primaryKey: true,
      // },
      user: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: {
            args: [2, 50],
            msg: "The name must only contain at least two letters",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      picture: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      pictureId: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      isGoogle: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      emailVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
