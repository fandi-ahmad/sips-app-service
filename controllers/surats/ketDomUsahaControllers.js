const { Surat, sequelize, Pegawai, Warga, Surat_khusus, Ket_usaha } = require('../../models')

const getAllSuratKetDomUsaha = async (req, res) => {
    try {
        const dataSurat = await sequelize.query( /*sql*/ `
            SELECT 
                surats.id, surats.no_surat, surats.nama_surat, surats.maksud,
                surats.createdAt, surats.id_pegawai, surats.id_warga, surats.isi_surat,
                surats.id_surat_khusus,

                pegawais.nama AS nama_pegawai, pegawais.jabatan, pegawais.nip,

                w.nama AS nama_warga, w.nik, w.jenis_kelamin, w.tempat_lahir, w.tanggal_lahir,
                w.pekerjaan, w.kewarganegaraan, w.status, w.agama, w.alamat, w.rt_rw,

                surat_khusus.id_ket_usaha,

                ku.nama_usaha, ku.jenis_usaha, ku.alamat_usaha, ku.tahun_berdiri, ku.bertempat

            FROM surats 
            JOIN pegawais ON (surats.id_pegawai = pegawais.id)
            JOIN wargas AS w ON (surats.id_warga = w.id)
            JOIN surat_khusus ON (surats.id_surat_khusus = surat_khusus.id)
            JOIN ket_usahas AS ku ON (surat_khusus.id_ket_usaha = ku.id)
            where surats.nama_surat = "surat keterangan domisili usaha"
        `)

        const formattedData = dataSurat[0].map((item) => {
            return {
                id: item.id,
                no_surat: item.no_surat,
                nama_surat: item.nama_surat,
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
                ket_usaha: {
                    id_surat_khusus: item.id_surat_khusus,
                    id: item.id_ket_usaha,
                    nama_usaha: item.nama_usaha, 
                    jenis_usaha: item.jenis_usaha, 
                    alamat_usaha: item.alamat_usaha, 
                    tahun_berdiri: item.tahun_berdiri, 
                    bertempat: item.bertempat
                }
            };
        });


        const result = {
            status: 'ok',
            data: formattedData
        }
        res.json(result)
    } catch (error) {
        // res.status(400)
        console.log(error, '<-- error get all surat ket baik')
    }
}

const createSuratKetDomUsaha = async (req, res) => {
    try {
        const {
            nama, nik, jenis_kelamin, tempat_lahir, tanggal_lahir, pekerjaan,
            kewarganegaraan, status, agama, alamat, rt_rw,

            no_surat, no_surat_number, maksud, isi_surat, id_pegawai,

            nama_usaha, jenis_usaha, alamat_usaha, tahun_berdiri, bertempat
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

        const newUsaha = await Ket_usaha.create({
            nama_usaha: nama_usaha,
            jenis_usaha: jenis_usaha,
            alamat_usaha: alamat_usaha,
            tahun_berdiri: tahun_berdiri,
            bertempat: bertempat
        })

        const newSuratKhusus = await Surat_khusus.create({
            id_ket_usaha: newUsaha.id
        })

        const newSurat = await Surat.create({
            no_surat: no_surat,
            no_surat_number: no_surat_number,
            nama_surat: 'surat keterangan domisili usaha',
            maksud: maksud,
            isi_surat: isi_surat,
            id_pegawai: id_pegawai,
            id_warga: newWarga.id,
            id_surat_khusus: newSuratKhusus.id
        })

        res.json({ status: 'ok', message: 'created successfuly' })
    } catch (error) {
        res.json({status: 'failed'})
        console.log(error, '<-- error get all surat ket usaha')
    }
}



module.exports = { getAllSuratKetDomUsaha, createSuratKetDomUsaha }