'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Keramaian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Keramaian.hasOne(models.Surat_khusus, { foreignKey: 'id_keramaian' });

    }
  }
  Keramaian.init({
    hari_tanggal: DataTypes.DATE,
    waktu: DataTypes.TIME,
    banyak_undangan: DataTypes.INTEGER,
    tempat_acara: DataTypes.STRING,
    rt_rw_k: DataTypes.STRING,
    hiburan: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Keramaian',
  });
  return Keramaian;
};