const { Op } = require('sequelize')
const { Warga, Warga_pelapor } = require('../models')

const getAllWarga = async (req, res) => {
    try {
        const { nik, search } = req.query
        // console.log(nik, '<-- nik query');
        // console.log(search, '<-- search query');
        const currentPage = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        
        if (nik) {
            const { count, rows } = await Warga.findAndCountAll({ 
                where: { 
                    nik: nik
                },
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

        } else if (search) {
            const { count, rows } = await Warga.findAndCountAll({ 
                where: { 
                    [Op.or]: [
                        { nik: { [Op.like]: `%${search}%` } },
                        { nama: { [Op.like]: `%${search}%` } }
                    ]
                },
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

        } else {
            const { count, rows } = await Warga.findAndCountAll({ 
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
        }
    } catch (error) {
        // res.status(400)
        console.log(error, '<-- error get all warga')
    }
}

const getWargaById = async (req, res) => {
    try {
        const { id } = req.query
        const warga = await Warga.findByPk(id)
        res.json({status: 'ok', data: warga})
    } catch (error) {
        console.log(error, '<-- error get warga by id');
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

module.exports = { getAllWarga, createWarga, deleteWarga, createWargaPelapor, getWargaById }