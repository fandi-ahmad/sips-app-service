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
        unique: true,
        type: Sequelize.STRING
      },
      no_surat_number: {
        allowNull: false,
        unique: true,
        type: Sequelize.INTEGER
      },
      nama_surat: {
        allowNull: false,
        type: Sequelize.STRING
      },
      maksud: {
        type: Sequelize.STRING
      },
      isi_surat: {
        type: Sequelize.TEXT
      },
      no_surat_pengantar: {
        type: Sequelize.STRING
      },
      tgl_surat_pengantar: {
        type: Sequelize.DATE
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
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Warga_pelapors',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      id_surat_khusus: {
        // allowNull: false,
        unique: true,
        type: Sequelize.INTEGER,
        // references: {
        //   model: 'Surat_khusus',
        //   key: 'id'
        // },
        // onUpdate: 'CASCADE',
        // onDelete: 'RESTRICT'
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