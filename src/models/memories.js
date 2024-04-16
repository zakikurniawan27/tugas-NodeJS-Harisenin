'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class memories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      memories.belongsTo(models.users, { foreignKey: 'userId', as: 'user' });
    }
  }
  memories.init(
    {
      title: DataTypes.STRING,
      body: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'memories',
    }
  );
  return memories;
};
