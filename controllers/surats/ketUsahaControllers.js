// surat keterangan usaha
// surat keterangan domisili usaha
// surat keterangan penghasilan

const { Surat, sequelize, Pegawai, Warga, Surat_khusus, Ket_usaha } = require('../../models')

const getAllSuratKetUsaha = async (req, res) => {
    try {
        const { name, id } = req.query
        console.log(name, id, '<-- name dan id');

        let query = /*sql*/`
            SELECT 
                surats.id, surats.no_surat, surats.nama_surat, surats.maksud, surats.variabel,
                surats.createdAt, surats.id_pegawai, surats.id_warga, surats.isi_surat,
                surats.id_surat_khusus, surats.no_surat_pengantar, surats.no_surat_number,

                pegawais.nama AS nama_pegawai, pegawais.jabatan, pegawais.nip,

                w.nama AS nama_warga, w.nik, w.jenis_kelamin, w.tempat_lahir, w.tanggal_lahir,
                w.pekerjaan, w.kewarganegaraan, w.status, w.agama, w.alamat, w.rt_rw,

                surat_khusus.id_ket_usaha,

                ku.nama_usaha, ku.jenis_usaha, ku.npwp, ku.no_izin_usaha, ku.no_fiskal,
                ku.luas_tempat_usaha, ku.alamat_usaha, ku.tahun_berdiri, ku.bertempat

            FROM surats 
            JOIN pegawais ON (surats.id_pegawai = pegawais.id)
            JOIN wargas AS w ON (surats.id_warga = w.id)
            JOIN surat_khusus ON (surats.id_surat_khusus = surat_khusus.id)
            JOIN ket_usahas AS ku ON (surat_khusus.id_ket_usaha = ku.id)
            where surats.nama_surat = "${name}" 
        `;

        id ? query += ` AND surats.id = "${id}"` : null

        const dataSurat = await sequelize.query(query)

        const formattedData = dataSurat[0].map((item) => {
            return {
                id: item.id,
                no_surat: item.no_surat,
                no_surat_number: item.no_surat_number,
                no_surat_pengantar: item.no_surat_pengantar,
                variabel: item.variabel,
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
                    npwp: item.npwp, 
                    no_izin_usaha: item.no_izin_usaha, 
                    no_fiskal: item.no_fiskal, 
                    luas_tempat_usaha: item.luas_tempat_usaha,
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
        console.log(error, '<-- error get all surat ket usaha')
    }
}

const createSuratKetUsaha = async (req, res) => {
    try {
        const {
            nama, nik, jenis_kelamin, tempat_lahir, tanggal_lahir, pekerjaan,
            kewarganegaraan, status, agama, alamat, rt_rw, variabel,

            no_surat, no_surat_number, maksud, isi_surat, id_pegawai, no_surat_pengantar, nama_surat,

            nama_usaha, jenis_usaha, npwp, no_izin_usaha, no_fiskal, luas_tempat_usaha,
            alamat_usaha, tahun_berdiri, bertempat, penghasilan
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
            npwp: npwp,
            no_izin_usaha: no_izin_usaha,
            no_fiskal: no_fiskal,
            luas_tempat_usaha: luas_tempat_usaha,
            alamat_usaha: alamat_usaha,
            tahun_berdiri: tahun_berdiri,
            bertempat: bertempat,
            penghasilan: penghasilan
        })

        const newSuratKhusus = await Surat_khusus.create({
            id_ket_usaha: newUsaha.id
        })

        const newSurat = await Surat.create({
            no_surat: no_surat,
            no_surat_number: no_surat_number,
            no_surat_pengantar: no_surat_pengantar,
            variabel: variabel,
            nama_surat: nama_surat,
            maksud: maksud,
            isi_surat: isi_surat,
            id_pegawai: id_pegawai,
            id_warga: newWarga.id,
            id_surat_khusus: newSuratKhusus.id
        })


        res.json({
            status: 'ok'
        })
    } catch (error) {
        res.json({status: 'failed'})
        console.log(error, '<-- error get all surat ket usaha')
    }
}

const updateSuratKetUsaha = async (req, res) => {
    try {
        const {
            nama, nik, jenis_kelamin, tempat_lahir, tanggal_lahir, pekerjaan,
            kewarganegaraan, status, agama, alamat, rt_rw,

            no_surat, no_surat_number, maksud, isi_surat, id_pegawai, id_surat, no_surat_pengantar,

            nama_usaha, jenis_usaha, npwp, no_izin_usaha, no_fiskal, luas_tempat_usaha,
            alamat_usaha, tahun_berdiri, bertempat, penghasilan
        } = req.body

        const updateSurat = await Surat.findByPk(id_surat)

        const id_warga = updateSurat.dataValues.id_warga
        const updateWarga = await Warga.findByPk(id_warga)

        const id_surat_khusus = updateSurat.dataValues.id_surat_khusus
        const updateSuratKhusus = await Surat_khusus.findByPk(id_surat_khusus)

        const id_ket_usaha = updateSuratKhusus.dataValues.id_ket_usaha
        const updateKetUsaha = await Ket_usaha.findByPk(id_ket_usaha)

        if (id_pegawai) {
            updateSurat.id_pegawai = id_pegawai
        }

        updateSurat.maksud = maksud
        updateSurat.isi_surat = isi_surat
        updateSurat.no_surat_pengantar = no_surat_pengantar

        updateWarga.nama = nama
        updateWarga.nik = nik
        updateWarga.jenis_kelamin = jenis_kelamin
        updateWarga.tempat_lahir = tempat_lahir
        updateWarga.tanggal_lahir = tanggal_lahir
        updateWarga.pekerjaan = pekerjaan
        updateWarga.kewarganegaraan = kewarganegaraan
        updateWarga.status = status
        updateWarga.agama = agama
        updateWarga.alamat = alamat
        updateWarga.rt_rw = rt_rw

        updateKetUsaha.nama_usaha = nama_usaha
        updateKetUsaha.jenis_usaha = jenis_usaha
        updateKetUsaha.npwp = npwp
        updateKetUsaha.no_izin_usaha = no_izin_usaha
        updateKetUsaha.no_fiskal = no_fiskal
        updateKetUsaha.luas_tempat_usaha = luas_tempat_usaha
        updateKetUsaha.alamat_usaha = alamat_usaha
        updateKetUsaha.tahun_berdiri = tahun_berdiri
        updateKetUsaha.bertempat = bertempat
        updateKetUsaha.penghasilan = penghasilan

        updateSurat.save()
        updateWarga.save()
        updateKetUsaha.save()

        res.json({
            status: 'ok',
            message: 'updated successfully',
            surat: updateSurat,
            warga: updateWarga,
            ket_usaha: updateKetUsaha
        })

    } catch (error) {
        res.json({status: 'failed'})
        console.log(error, '<-- error update surat ket usaha')
    }
}

const deleteSuratKetUsaha = async (req, res) => {
    try {
        const { id_surat } = req.body

        const deleteSurat = await Surat.findByPk(id_surat)

        const id_warga = deleteSurat.dataValues.id_warga
        const deleteWarga = await Warga.findByPk(id_warga)

        const id_surat_khusus = deleteSurat.dataValues.id_surat_khusus
        const deleteSuratKhusus = await Surat_khusus.findByPk(id_surat_khusus)

        const id_ket_usaha = deleteSuratKhusus.dataValues.id_ket_usaha
        const deleteKetUsaha = await Ket_usaha.findByPk(id_ket_usaha)

        deleteSurat.destroy()
        deleteWarga.destroy()
        deleteSuratKhusus.destroy()
        deleteKetUsaha.destroy()

    } catch (error) {
        res.json({status: 'failed'})
        console.log(error, '<-- error delete surat ket usaha')
    }
}

module.exports = { getAllSuratKetUsaha, createSuratKetUsaha, updateSuratKetUsaha, deleteSuratKetUsaha }