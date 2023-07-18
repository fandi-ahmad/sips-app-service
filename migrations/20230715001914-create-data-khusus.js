'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Data_khusus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      penghasilan: {
        type: Sequelize.INTEGER
      },
      janda_duda: {
        type: Sequelize.STRING
      },
      nama_pasangan: {
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
      ADD CONSTRAINT FK_surat_khusus_data_khusus
      FOREIGN KEY (id_data_khusus)
      REFERENCES data_khusus(id)
      ON UPDATE CASCADE
      ON DELETE RESTRICT;
    `);

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Data_khusus');
  }
};