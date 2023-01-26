const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define(
    "description",
    {
      captionEn: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descriptionEn: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      captionEs: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      descriptionEs: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      position: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
