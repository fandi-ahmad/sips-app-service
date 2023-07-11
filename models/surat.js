'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Surat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Surat.belongsToMany(models.Pegawai, { foreignKey: 'id_pegawai' })
      Surat.belongsToMany(models.Warga, { foreignKey: 'id_warga' })
      Surat.belongsToMany(models.Warga, { foreignKey: 'id_warga_pelapor' })
    }
  }
  Surat.init({
    no_surat: DataTypes.STRING,
    nama_surat: DataTypes.STRING,
    maksud: DataTypes.STRING,
    id_pegawai: DataTypes.INTEGER,
    id_warga: DataTypes.INTEGER,
    id_warga_pelapor: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Surat',
  });
  return Surat;
};