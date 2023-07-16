// surat keterangan belum memiliki rumah
// surat keterangan tidak mampu (sktm) berobat / umum
// surat keterangan belum bekerja
// surat keterangan belum menikah

const { Surat, sequelize, Pegawai, Warga } = require('../../models')

const getAllSuratByType = async (req, res) => {
    try {
        const { nama_surat } = req.body
        const dataSurat = await sequelize.query( /*sql*/ `
            SELECT 
                surats.id, surats.no_surat, surats.nama_surat, surats.maksud,
                surats.createdAt, surats.id_pegawai, surats.id_warga, surats.isi_surat,
                surats.no_surat_pengantar, surats.tgl_surat_pengantar,

                pegawais.nama AS nama_pegawai, pegawais.jabatan, pegawais.nip,

                w.nama AS nama_warga, w.nik, w.jenis_kelamin, w.tempat_lahir, w.tanggal_lahir,
                w.pekerjaan, w.kewarganegaraan, w.status, w.agama, w.alamat, w.rt_rw

            FROM surats 
            JOIN pegawais ON (surats.id_pegawai = pegawais.id)
            JOIN wargas AS w ON (surats.id_warga = w.id)
            WHERE surats.nama_surat = "surat keterangan usaha"
        `)

        const formattedData = dataSurat[0].map((item) => {
            return {
                id: item.id,
                no_surat: item.no_surat,
                maksud: item.maksud,
                isi_surat: item.isi_surat,
                no_surat_pengantar: item.no_surat_pengantar,
                tgl_surat_pengantar: item.tgl_surat_pengantar,
                createdAt: item.createdAt,
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
                    jenis_kelamin: item.jenis_kelamin,
                    tempat_lahir: item.tempat_lahir,
                    tanggal_lahir: item.tanggal_lahir,
                    pekerjaan: item.pekerjaan,
                    kewarganegaraan: item.kewarganegaraan,
                    status: item.status,
                    agama: item.agama,
                    alamat: item.alamat,
                    rt_rw: item.rt_rw
                },
            };
        });

        res.json({ status: 'ok', nama_surat: nama_surat, data: formattedData })
    } catch (error) {
        res.json({ status: 'failed', message: 'data not found' })
    }
}

const createSuratByType = async (req, res) => {
    try {
        const {
            nama, nik, jenis_kelamin, tempat_lahir, tanggal_lahir, pekerjaan,
            kewarganegaraan, status, agama, alamat, rt_rw,

            no_surat, no_surat_number, maksud, isi_surat, id_pegawai,
            no_surat_pengantar, tgl_surat_pengantar, nama_surat

        } = req.body

        const newWarga = await Warga.create({
            nama: nama,
            nik: nik,
            jenis_kelamin: jenis_kelamin,
            tempat_lahir: tempat_lahir,
            tanggal_lahir: tanggal_lahir,
            pekerjaan: pekerjaan,
            kewarganegaraan: kewarganegaraan,
            status: status,
            agama: agama,
            alamat: alamat,
            rt_rw: rt_rw,
        })

        const newSurat = await Surat.create({
            no_surat: no_surat,
            no_surat_number: no_surat_number,
            nama_surat: nama_surat,
            maksud: maksud,
            isi_surat: isi_surat,
            id_pegawai: id_pegawai,
            id_warga: newWarga.id,
            no_surat_pengantar: no_surat_pengantar,
            tgl_surat_pengantar: tgl_surat_pengantar
        })

        res.json({ status: 'ok', message: 'created successfully' })

    } catch (error) {
        
    }
}

module.exports = { getAllSuratByType, createSuratByType }