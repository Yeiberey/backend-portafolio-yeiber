const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define(
    "reaction",
    {},
    {
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
