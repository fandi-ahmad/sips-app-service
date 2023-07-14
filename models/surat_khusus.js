'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Surat_khusus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Surat_khusus.hasOne(models.Surat, { foreignKey: 'id_surat_khusus' })
    }
  }
  Surat_khusus.init({
    id_keramaian: DataTypes.INTEGER,
    id_data_khusus: DataTypes.INTEGER,
    id_ket_usaha: DataTypes.INTEGER,
    id_kematian: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Surat_khusus',
  });
  return Surat_khusus;
};