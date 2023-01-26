const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define(
    "activity",
    {
      imagePrimary: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdDate: {
        type: DataTypes.DATE,
        defaultValue: Date.now(),
      },
      state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      featured: {
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
