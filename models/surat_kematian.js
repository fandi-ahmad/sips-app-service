'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Surat_kematian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Surat_kematian.hasOne(models.Surat_khusus, { foreignKey: 'id_kematian' });
    }
  }
  Surat_kematian.init({
    sebab_kematian: DataTypes.STRING,
    tempat_kematian: DataTypes.STRING,
    hari_tanggal: DataTypes.DATE,
    hubungan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Surat_kematian',
  });
  return Surat_kematian;
};