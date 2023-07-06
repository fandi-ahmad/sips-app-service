const { Pegawai } = require('../models')

const getAllPegawai = async (req, res) => {
    try {
        const data = await Pegawai.findAll()
        const result = {
            status: 'ok',
            data: data
        }
        res.json(result)
        // res.render('dashboard', {pegawais: data, status: 'okey'})
    } catch (error) {
        // res.status(400)
        console.log(error, '<-- error get all pegawai')
    }
}

const pegawaiView = async (req, res) => {
    try {
        const data = await Pegawai.findAll()
        const result = {
            status: 'ok',
            data: data
        }
        // res.json(result)
        res.render('pegawai', {pegawais: data, status: 'okey'})
    } catch (error) {
        // res.status(400)
        console.log(error, '<-- error get all pegawai')
    }
}

const createPegawai = async (req, res) => {
    try {
        const { nama, jabatan, nip } = req.body

        const newPegawai = await Pegawai.create({
            nama: nama,
            jabatan: jabatan,
            nip: nip
        })

        res.status(201).json({
            status: 'ok',
            data: {
                id: newPegawai.id,
                nama: newPegawai.nama,
                jabatan: newPegawai.jabatan,
                nip: newPegawai.nip
            }
        })
    } catch (error) {
        res.status(400)
    }
}

const updatePegawai = async (req, res) => {
    try {
        const { id, nama, jabatan, nip } = req.body
        const pegawai = await Pegawai.findByPk(id)

        pegawai.nama = nama
        pegawai.jabatan = jabatan
        pegawai.nip = nip
        pegawai.save()

        res.json({
            status: 'ok',
            message: 'pegawai updated successfully'
        })
    } catch (error) {
        res.status(400)
    }
}

const deletePegawai = async (req, res) => {
    try {
        const { id } = req.params
        const pegawai = await Pegawai.findByPk(id)
        if (!pegawai) {
            return res.status(404).json({
                status: 'failed',
                message: 'data is not found'
            })
        }
        pegawai.destroy()
        res.json({
            status: 'ok',
            message: 'delete successfully'
        })
    } catch (error) {
        res.status(400)
    }
}

module.exports = { getAllPegawai, createPegawai, updatePegawai, deletePegawai, pegawaiView }