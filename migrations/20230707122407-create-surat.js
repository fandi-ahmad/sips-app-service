'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Surats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_surat: {
        allowNull: false,
        type: Sequelize.STRING
      },
      nama_surat: {
        allowNull: false,
        type: Sequelize.STRING
      },
      maksud: {
        type: Sequelize.STRING
      },
      id_pegawai: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Pegawais',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      id_warga: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Wargas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      id_warga_pelapor: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Warga',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
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
    await queryInterface.dropTable('Surats');
  }
};