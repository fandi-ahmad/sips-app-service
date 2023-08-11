const { Pegawai } = require('../models')

const getAllPegawai = async (req, res) => {
    try {
        const currentPage = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10

        const { count, rows } = await Pegawai.findAndCountAll({
            offset: (currentPage - 1) * limit,
            limit: limit
        })

        const result = {
            status: 'ok',
            page: currentPage,
            limit: limit,
            total_page: Math.ceil(count/limit),
            total_data: count,
            data: rows,
        }
        res.json(result)
        // res.render('pegawai', {pegawais: data})
    } catch (error) {
        // res.status(400)
        console.log(error, '<-- error get all pegawai')
    }
}

const getPegawaiActive = async (req, res) => {
    try {
        const pegawai = await Pegawai.findAll({
            where: {
                isActive: true
            }
        })
        res.json({status: 'ok', data: pegawai})
    } catch (error) {
        res.status(400)
    }
}

const createPegawai = async (req, res) => {
    try {
        const { nama, jabatan, nip, isActive } = req.body
        await Pegawai.create({
            nama: nama,
            jabatan: jabatan,
            nip: nip,
            isActive: isActive
        })
        res.json({
            status: 'ok',
            message: 'successfully'
        })
        // res.redirect('/pegawai')
    } catch (error) {
        res.status(400)
        console.log(error, '<-- error create pegawai')
    }
}

const updatePegawai = async (req, res) => {
    try {
        const { id, nama, jabatan, nip, isActive } = req.body
        const pegawai = await Pegawai.findByPk(id)
        pegawai.nama = nama
        pegawai.jabatan = jabatan
        pegawai.nip = nip
        pegawai.isActive = isActive
        pegawai.save()

        res.json({
            status: 'ok',
            message: 'successfully'
        })
        // res.redirect('/pegawai')
    } catch (error) {
        res.status(400)
        console.log(error, '<-- error update pegawai')
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
            message: 'successfully'
        })
        // res.redirect('/pegawai')
    } catch (error) {
        res.status(400)
    }
}

module.exports = { getAllPegawai, createPegawai, updatePegawai, deletePegawai, getPegawaiActive }