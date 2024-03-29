'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Warga_pelapors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nik: {
        unique: true,
        allowNull: false,
        type: Sequelize.STRING
      },
      jenis_kelamin: {
        allowNull: true,
        type: Sequelize.ENUM('l', 'p')
      },
      tempat_lahir: {
        allowNull: true,
        type: Sequelize.STRING
      },
      tanggal_lahir: {
        allowNull: true,
        type: Sequelize.DATEONLY
      },
      pekerjaan: {
        allowNull: true,
        type: Sequelize.STRING
      },
      kewarganegaraan: {
        allowNull: true,
        type: Sequelize.STRING
      },
      status: {
        allowNull: true,
        type: Sequelize.STRING
      },
      agama: {
        allowNull: true,
        type: Sequelize.STRING
      },
      alamat: {
        allowNull: true,
        type: Sequelize.STRING
      },
      rt_rw: {
        allowNull: true,
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Warga_pelapors');
  }
};