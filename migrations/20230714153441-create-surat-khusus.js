'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Surat_khusus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_keramaian: {
        allowNull: true,
        unique: true,
        type: Sequelize.INTEGER,
      },
      id_data_khusus: {
        allowNull: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      id_ket_usaha: {
        allowNull: true,
        unique: true,
        type: Sequelize.INTEGER
      },
      id_kematian: {
        allowNull: true,
        unique: true,
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
      ALTER TABLE surats
      ADD CONSTRAINT FK_surat_surat_khusus
      FOREIGN KEY (id_surat_khusus)
      REFERENCES surat_khusus(id)
      ON UPDATE CASCADE
      ON DELETE RESTRICT;
    `);
    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Surat_khusus');
  }
};