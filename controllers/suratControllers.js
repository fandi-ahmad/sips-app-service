const { Surat, sequelize } = require('../models')

const getAllSurat = async (req, res) => {
    try {
        const data = await sequelize.query(`
            SELECT
                surats.id,
                surats.no_surat,
                surats.nama_surat, 
                surats.maksud,
                surats.updatedAt,
                surats.id_pegawai,
                surats.id_warga,
                surats.id_warga_pelapor,

                pegawais.nama AS nama_pegawai,
                pegawais.jabatan, 
                pegawais.nip,

                w.nama AS nama_warga,
                w.nik,
                w.jenis_kelamin,
                w.tempat_lahir,
                w.tanggal_lahir,
                w.pekerjaan,
                w.kewarganegaraan,
                w.status,
                w.agama,
                w.alamat,
                w.rt_rw,

                wp.nama AS nama_warga_wp,
                wp.nik AS nik_wp,
                wp.jenis_kelamin AS jenis_kelamin_wp,
                wp.tempat_lahir AS tempat_lahir_wp,
                wp.tanggal_lahir AS tanggal_lahir_wp,
                wp.pekerjaan AS pekerjaan_wp,
                wp.kewarganegaraan AS kewarganegaraan_wp,
                wp.status AS status_wp,
                wp.agama AS agama_wp,
                wp.alamat AS alamat_wp,
                wp.rt_rw AS rt_rw_wp

            FROM surats
            JOIN pegawais ON (surats.id_pegawai = pegawais.id)
            JOIN wargas AS w ON (surats.id_warga = w.id)
            JOIN warga_pelapors AS wp ON (surats.id_warga_pelapor = wp.id)
        `)

        const formattedData = data[0].map((item) => {
            return {
                id: item.id,
                no_surat: item.no_surat,
                nama_surat: item.nama_surat,
                maksud: item.maksud,
                updatedAt: item.updatedAt,
                pegawai: {
                    id_pegawai: item.id_pegawai,
                    nama: item.nama_pegawai,
                    jabatan: item.jabatan,
                    nip: item.nip
                },
                warga: {
                    id_warga: item.id_warga,
                    nama: item.nama_warga,
                    nik: item.nik,
                    jenis_kelamin: item.nik,
                    tempat_lahir: item.tempat_lahir,
                    tanggal_lahir: item.tanggal_lahir,
                    pekerjaan: item.pekerjaan,
                    kewarganegaraan: item.kewarganegaraan,
                    status: item.status,
                    agama: item.agama,
                    alamat: item.alamat,
                    rt_rw: item.rt_rw
                },
                warga_pelapor: {
                    id_warga: item.id_warga_pelapor,
                    nama: item.nama_warga_wp,
                    nik: item.nik_wp,
                    jenis_kelamin: item.nik_wp,
                    tempat_lahir: item.tempat_lahir_wp,
                    tanggal_lahir: item.tanggal_lahir_wp,
                    pekerjaan: item.pekerjaan_wp,
                    kewarganegaraan: item.kewarganegaraan_wp,
                    status: item.status_wp,
                    agama: item.agama_wp,
                    alamat: item.alamat_wp,
                    rt_rw: item.rt_rw_wp
                }
            };
        });

        res.json({data: formattedData})
    } catch (error) {
        res.json({status: 'error', message: 'something wrong!'})
        console.log(error, '<-- error get all surat')
    }
}

const createSurat = async (req, res) => {
    try {
        const data = await sequelize.query()
    } catch (error) {
        
    }
}

module.exports = { getAllSurat }