'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pegawai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pegawai.hasMany(models.Surat, { foreignKey: 'id_pegawai' })
    }
  }
  Pegawai.init({
    nama: DataTypes.STRING,
    jabatan: DataTypes.STRING,
    nip: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Pegawai',
  });
  return Pegawai;
};