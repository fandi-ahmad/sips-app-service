const { Surat, sequelize, Pegawai, Warga } = require('../../models')

const getAllSuratKelBaik = async (req, res) => {
    try {
        const dataWarga = await Warga.findAll()
        const dataPegawai = await Pegawai.findAll()
        const result = {
            status: 'ok',
            warga: dataWarga,
            dataPegawai: dataPegawai
        }
        res.json(result)
    } catch (error) {
        // res.status(400)
        console.log(error, '<-- error get all surat kel baik')
    }
}

const createSuratKelBaik = async (req, res) => {
    try {
        const {
            nama, nik, jenis_kelamin, tempat_lahir, tanggal_lahir, pekerjaan,
            kewarganegaraan, status, agama, alamat, rt_rw,
            no_surat, no_surat_number, maksud, isi_surat, no_surat_pengantar,
            tgl_surat_pengantar, id_pegawai
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
            nama_surat: 'surat keterangan berkelakuan baik',
            maksud: maksud,
            isi_surat: isi_surat,
            no_surat_pengantar: no_surat_pengantar,
            tgl_surat_pengantar: tgl_surat_pengantar || null,
            id_pegawai: id_pegawai,
            id_warga: newWarga.id,
        })

        res.json({ 
            status: 'ok', 
            message: 'create successfully',
            warga: newWarga,
            surat: newSurat
        })
    } catch (error) {
        console.log(error, '<-- error create surat kel baik')
    }
}


const updateSuratKelBaik = async (req, res) => {
    try {
        const {
            nama, nik, jenis_kelamin, tempat_lahir, tanggal_lahir, pekerjaan,
            kewarganegaraan, status, agama, alamat, rt_rw,
            id_surat, no_surat, no_surat_number, maksud, isi_surat, no_surat_pengantar,
            tgl_surat_pengantar, id_pegawai
        } = req.body

        const updateSurat = await Surat.findByPk(id_surat)
        const id_warga = updateSurat.dataValues.id_warga
        const updateWarga = await Warga.findByPk(id_warga)

        if (id_pegawai) {
            updateSurat.id_pegawai = id_pegawai
        }

        updateSurat.maksud = maksud
        updateSurat.isi_surat = isi_surat
        updateSurat.no_surat_pengantar = no_surat_pengantar
        updateSurat.tgl_surat_pengantar = tgl_surat_pengantar

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

        updateSurat.save()
        updateWarga.save()

        res.json({
            status: 'ok',
            message: 'updated successFully',
            surat: updateSurat,
            warga: updateWarga,
        })

    } catch (error) {
        console.log(error, '<-- error update surat kel baik')
        res.json({status: 'failed', message: 'data not found'})
    }
}

const deleteSuratKelBaik = async (req, res) => {
    try {
        const { id_surat } = req.body

        const deleteSurat = await Surat.findByPk(id_surat)
        const id_warga = deleteSurat.dataValues.id_warga
        const deleteWarga = await Warga.findByPk(id_warga)

        deleteSurat.destroy()
        deleteWarga.destroy()

        // const pegawai = await Pegawai.findByPk(id)
        // if (!pegawai) {
        //     return res.status(404).json({
        //         status: 'failed',
        //         message: 'data is not found'
        //     })
        // }
        // pegawai.destroy()
        res.json({
            status: 'ok',
            message: 'successfully',
        })
    } catch (error) {
        console.log(error, '<-- error delete surat kel baik')
    }
}

module.exports = { getAllSuratKelBaik, createSuratKelBaik, updateSuratKelBaik, deleteSuratKelBaik }