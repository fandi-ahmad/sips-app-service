'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Surat_khusus extends Model {
    static associate(models) {
      Surat_khusus.hasOne(models.Surat, { foreignKey: 'id_surat_khusus' })
      Surat_khusus.belongsTo(models.Keramaian, { foreignKey: 'id_keramaian' });
      Surat_khusus.belongsTo(models.Data_khusus, { foreignKey: 'id_data_khusus' });
      Surat_khusus.belongsTo(models.Ket_usaha, { foreignKey: 'id_ket_usaha' });
      Surat_khusus.belongsTo(models.Surat_kematian, { foreignKey: 'id_kematian' });
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