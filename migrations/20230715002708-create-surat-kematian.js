'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Surat_kematians', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sebab_kematian: {
        type: Sequelize.STRING
      },
      tempat_kematian: {
        type: Sequelize.STRING
      },
      hari_tanggal: {
        type: Sequelize.DATEONLY
      },
      hubungan: {
        type: Sequelize.STRING
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
      ADD CONSTRAINT FK_surat_khusus_kematian
      FOREIGN KEY (id_kematian)
      REFERENCES surat_kematians(id)
      ON UPDATE CASCADE
      ON DELETE RESTRICT;
    `);

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Surat_kematians');
  }
};