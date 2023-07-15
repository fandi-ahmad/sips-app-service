'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Keramaians', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hari_tanggal: {
        type: Sequelize.DATE
      },
      waktu: {
        type: Sequelize.TIME
      },
      banyak_undangan: {
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
      ADD CONSTRAINT FK_surat_khusus_keramaian
      FOREIGN KEY (id_keramaian)
      REFERENCES keramaians(id)
      ON UPDATE CASCADE
      ON DELETE RESTRICT;
    `);

  },
  
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Keramaians');
  }
};