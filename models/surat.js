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
      Surat.belongsTo(models.Pegawai, { foreignKey: 'id_pegawai' })
      Surat.belongsTo(models.Warga, { foreignKey: 'id_warga' })
      Surat.belongsTo(models.Warga_pelapor, { foreignKey: 'id_warga_pelapor' })
      Surat.belongsTo(models.Surat_khusus, { foreignKey: 'id_surat_khusus' })
    }
  }
  Surat.init({
    no_surat: DataTypes.STRING,
    no_surat_number: DataTypes.STRING,
    nama_surat: DataTypes.STRING,
    maksud: DataTypes.STRING,
    isi_surat: DataTypes.TEXT,
    no_surat_pengantar: DataTypes.STRING,
    variabel: DataTypes.STRING,
    tgl_surat_pengantar: DataTypes.DATE,
    id_pegawai: DataTypes.INTEGER,
    id_warga: DataTypes.INTEGER,
    id_warga_pelapor: DataTypes.INTEGER,
    id_surat_khusus: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Surat',
  });
  return Surat;
};