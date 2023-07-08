const { Warga, Warga_pelapor } = require('../models')

const getAllWarga = async (req, res) => {
    try {
        const data = await Warga.findAll()
        const result = {
            status: 'ok',
            data: data
        }
        // res.json(result)
        res.render('warga', {status: 'okey'})
    } catch (error) {
        // res.status(400)
        console.log(error, '<-- error get all warga')
    }
}

const createWarga = async (req, res) => {
    try {
        const { nama, nik, jenis_kelamin, tempat_lahir, tanggal_lahir, pekerjaan, kewarganegaraan, status, agama, alamat, rt_rw } = req.body

        const newData = await Warga.create({
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

        res.status(201).json({
            status: 'ok',
            message: 'create warga successfully',
            data: {
                id: newData.id,
                nama: newData.nama,
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'input tidak boleh kosong'
        })
    }
}

const createWargaPelapor = async (req, res) => {
    try {
        const { nama, nik, jenis_kelamin, tempat_lahir, tanggal_lahir, pekerjaan, kewarganegaraan, status, agama, alamat, rt_rw } = req.body

        const newData = await Warga_pelapor.create({
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

        res.status(201).json({
            status: 'ok',
            message: 'create warga pelapor successfully',
            data: {
                id: newData.id,
                nama: newData.nama,
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'input tidak boleh kosong'
        })
    }
}

const deleteWarga = async (req, res) => {
    try {
        const { id } = req.params
        const warga = await Warga.findByPk(id)
        if (!warga) {
            return res.status(404).json({
                status: 'failed',
                message: 'data is not found'
            })
        }
        warga.destroy()
        res.json({
            status: 'ok',
            message: 'delete successfully'
        })
    } catch (error) {
        res.status(400)
    }
}

module.exports = { getAllWarga, createWarga, deleteWarga, createWargaPelapor }