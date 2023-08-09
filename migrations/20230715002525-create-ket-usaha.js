'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Ket_usahas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_usaha: {
        type: Sequelize.STRING
      },
      jenis_usaha: {
        type: Sequelize.STRING
      },
      npwp: {
        type: Sequelize.STRING
      },
      no_izin_usaha: {
        type: Sequelize.STRING
      },
      no_fiskal: {
        type: Sequelize.STRING
      },
      luas_tempat_usaha: {
        type: Sequelize.STRING
      },
      alamat_usaha: {
        type: Sequelize.STRING
      },
      tahun_berdiri: {
        type: Sequelize.STRING
      },
      bertempat: {
        type: Sequelize.STRING
      },
      penghasilan: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.sequelize.query(`
      ALTER TABLE surat_khusus
      ADD CONSTRAINT FK_surat_khusus_ket_usaha
      FOREIGN KEY (id_ket_usaha)
      REFERENCES ket_usahas(id)
      ON UPDATE CASCADE
      ON DELETE RESTRICT;
    `);

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Ket_usahas');
  }
};