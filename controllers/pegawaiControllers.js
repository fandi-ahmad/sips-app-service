const { Pegawai } = require('../models')

const getAllPegawai = async (req, res) => {
    try {
        const data = await Pegawai.findAll()
        res.render('pegawai', {pegawais: data})
    } catch (error) {
        // res.status(400)
        console.log(error, '<-- error get all pegawai')
    }
}

const createPegawai = async (req, res) => {
    try {
        const { nama, jabatan, nip } = req.body
        await Pegawai.create({
            nama: nama,
            jabatan: jabatan,
            nip: nip
        })
        res.redirect('/pegawai')
    } catch (error) {
        res.status(400)
        console.log(error, '<-- error create pegawai')
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
        res.redirect('/pegawai')
    } catch (error) {
        res.status(400)
        console.log(error, '<-- error update pegawai')
    }
}

const deletePegawai = async (req, res) => {
    try {
        const { id } = req.body
        const pegawai = await Pegawai.findByPk(id)
        if (!pegawai) {
            return res.status(404).json({
                status: 'failed',
                message: 'data is not found'
            })
        }
        pegawai.destroy()
        setTimeout(() => {
            res.redirect('/pegawai')
        }, 100);
    } catch (error) {
        res.status(400)
    }
}

module.exports = { getAllPegawai, createPegawai, updatePegawai, deletePegawai }