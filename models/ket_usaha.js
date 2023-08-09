'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ket_usaha extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ket_usaha.hasOne(models.Surat_khusus, { foreignKey: 'id_ket_usaha' });
    }
  }
  Ket_usaha.init({
    nama_usaha: DataTypes.STRING,
    jenis_usaha: DataTypes.STRING,
    npwp: DataTypes.STRING,
    no_izin_usaha: DataTypes.STRING,
    no_fiskal: DataTypes.STRING,
    luas_tempat_usaha: DataTypes.STRING,
    alamat_usaha: DataTypes.STRING,
    tahun_berdiri: DataTypes.STRING,
    bertempat: DataTypes.STRING,
    penghasilan: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ket_usaha',
  });
  return Ket_usaha;
};