'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Data_khusus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Data_khusus.hasOne(models.Surat_khusus, { foreignKey: 'id_data_khusus' });
    }
  }
  Data_khusus.init({
    penghasilan: DataTypes.INTEGER,
    janda_duda: DataTypes.STRING,
    nama_pasangan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Data_khusus',
  });
  return Data_khusus;
};