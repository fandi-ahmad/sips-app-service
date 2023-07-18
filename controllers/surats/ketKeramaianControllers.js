const { Surat, sequelize, Pegawai, Warga, Surat_khusus, Keramaian } = require('../../models')

const createSuratKeramaian = async (req, res) => {
    try {
        const {
            nama, nik, jenis_kelamin, tempat_lahir, tanggal_lahir, pekerjaan,
            kewarganegaraan, status, agama, alamat, rt_rw,

            no_surat, no_surat_number, maksud, isi_surat, id_pegawai,

            hari_tanggal, waktu, banyak_undangan, acara_dilaksanakan, rt_rw2, hiburan, catatan
        } = req.body


    } catch (error) {
        res.json({status: 'failed'})
        console.log(error, '<-- error create surat keramaian')
    }
}

module.exports = { createSuratKeramaian }