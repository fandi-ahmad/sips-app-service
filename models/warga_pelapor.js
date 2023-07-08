'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Warga_pelapor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Warga_pelapor.hasOne(models.Surat, { foreignKey: 'id_warga_pelapor' })
    }
  }
  Warga_pelapor.init({
    nama: DataTypes.STRING,
    nik: DataTypes.STRING,
    jenis_kelamin: DataTypes.ENUM('l', 'p'),
    tempat_lahir: DataTypes.STRING,
    tanggal_lahir: DataTypes.DATE,
    pekerjaan: DataTypes.STRING,
    kewarganegaraan: DataTypes.STRING,
    status: DataTypes.STRING,
    agama: DataTypes.STRING,
    alamat: DataTypes.STRING,
    rt_rw: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Warga_pelapor',
  });
  return Warga_pelapor;
};